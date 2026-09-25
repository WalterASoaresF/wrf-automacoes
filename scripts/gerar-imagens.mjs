// Processa os arquivos reais da marca (src/assets/brandingmarca/*.webp, fundo branco sólido)
// e gera:
//   - src/assets/brandingmarca/isotipo-preto.png / logotipo-preto.png   (recortados, fundo transparente, usados no site)
//   - src/assets/brandingmarca/isotipo-branco.png                       (versão branca, para o og-image)
//   - public/favicon.png, public/favicon-192.png, public/apple-touch-icon.png
//   - public/logo.png      (quadrado, para o JSON-LD Organization.logo)
//   - public/og-image.png  (1200x630, compartilhamento)
//
// Uso: npm run gerar-imagens. Rodar de novo sempre que os arquivos em brandingmarca/ mudarem.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const ORIGEM = 'src/assets/brandingmarca';
const DESTINO_MARCA = 'src/assets/brandingmarca';

// Recorta o excesso de fundo branco e devolve um PNG com alfa: a tinta (preta ou branca)
// fica opaca onde a arte era escura, e transparente onde era branca. Funciona porque a arte
// original é só tinta preta sobre fundo branco, sem cor.
async function paraTintaTransparente(caminho, corRGB) {
  const trimado = await sharp(caminho).trim({ threshold: 10 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { data, info } = trimado;
  const saida = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += info.channels) {
    const luminancia = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const alfa = 255 - luminancia; // branco -> transparente, preto -> opaco
    saida[i] = corRGB[0];
    saida[i + 1] = corRGB[1];
    saida[i + 2] = corRGB[2];
    saida[i + 3] = alfa;
  }
  return sharp(saida, { raw: { width: info.width, height: info.height, channels: 4 } }).png();
}

await mkdir(DESTINO_MARCA, { recursive: true });

const isotipoPreto = await paraTintaTransparente(`${ORIGEM}/isotipo.webp`, [0, 0, 0]);
await isotipoPreto.clone().toFile(`${DESTINO_MARCA}/isotipo-preto.png`);

const isotipoBranco = await paraTintaTransparente(`${ORIGEM}/isotipo.webp`, [255, 255, 255]);
await isotipoBranco.clone().toFile(`${DESTINO_MARCA}/isotipo-branco.png`);

const logotipoPreto = await paraTintaTransparente(`${ORIGEM}/logoeisotipo.webp`, [0, 0, 0]);
await logotipoPreto.clone().toFile(`${DESTINO_MARCA}/logotipo-preto.png`);

const logotipoBranco = await paraTintaTransparente(`${ORIGEM}/logoeisotipo.webp`, [255, 255, 255]);
await logotipoBranco.clone().toFile(`${DESTINO_MARCA}/logotipo-branco.png`);

// Favicon: isotipo preto centrado num quadrado branco, com um pouco de respiro
async function favicon(tamanho, arquivo) {
  const respiro = Math.round(tamanho * 0.18);
  const isotipoBuf = await isotipoPreto.clone().resize(tamanho - respiro * 2, tamanho - respiro * 2, { fit: 'inside' }).toBuffer();
  await sharp({ create: { width: tamanho, height: tamanho, channels: 4, background: '#ffffff' } })
    .composite([{ input: isotipoBuf, gravity: 'center' }])
    .png()
    .toFile(`public/${arquivo}`);
}
await favicon(48, 'favicon.png');
await favicon(192, 'favicon-192.png');
await favicon(180, 'apple-touch-icon.png');

// Logo para o JSON-LD (Organization.logo): quadrado, fundo branco
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#ffffff' } })
  .composite([{ input: await isotipoPreto.clone().resize(340, 340, { fit: 'inside' }).toBuffer(), gravity: 'center' }])
  .png()
  .toFile('public/logo.png');

// Imagem de compartilhamento (og-image), 1200x630, fundo preto com a marca em branco
const isotipoOg = await isotipoBranco.clone().resize({ height: 200 }).toBuffer();
const textoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <text x="80" y="390" fill="#fff" font-family="Arial, sans-serif" font-weight="700" font-size="52">Quando alguém procura o que você vende,</text>
  <text x="80" y="460" fill="#fff" font-family="Arial, sans-serif" font-weight="700" font-size="52">você aparece antes do seu concorrente?</text>
  <rect x="80" y="500" width="96" height="8" fill="#1E3CF5"/>
  <text x="80" y="560" fill="#D5D8DD" font-family="Arial, sans-serif" font-size="28">Presença digital e automação para negócios em Salvador</text>
</svg>`;
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#000000' } })
  .composite([
    { input: isotipoOg, left: 80, top: 80 },
    { input: Buffer.from(textoSvg), left: 0, top: 0 },
  ])
  .png()
  .toFile('public/og-image.png');

console.log('Gerados: brandingmarca (preto/branco), public/favicon*.png, public/logo.png, public/og-image.png');
