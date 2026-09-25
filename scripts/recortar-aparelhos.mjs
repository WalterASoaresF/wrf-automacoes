// Recorta o fundo das capturas pela silhueta do aparelho (não por retângulo).
//
// Todo aparelho tem, na borda, um aro metálico cinza neutro e um bezel preto; os fundos das
// fotos são "quentes" (marrom escuro, creme, madeira — vermelho bem maior que azul). Para cada
// linha, o script anda da esquerda e da direita para dentro até achar o primeiro pixel do
// aparelho; para cada coluna, de cima e de baixo. Como o aparelho é convexo, a interseção dessas
// faixas é a silhueta dele — e o script nunca olha para dentro da tela, então o conteúdo da tela
// nunca é apagado, mesmo que tenha cores parecidas com o fundo.
//
// Uso: node scripts/recortar-aparelhos.mjs <entrada> <saida> <escuro|creme|madeira>
import sharp from 'sharp';

const [entrada, saida, fundo] = process.argv.slice(2);

const lum = (r, g, b) => (r + g + b) / 3;
const ehAparelho = {
  // Celulares sobre marrom escuro (~38,34,29): o fundo fica numa faixa de brilho que nem o
  // bezel preto nem o aro claro ocupam.
  escuro: (r, g, b) => Math.abs(r - b) <= 6 && (lum(r, g, b) < 18 || lum(r, g, b) > 70),
  // Sobre creme: o fundo e a sombra do mockup são claros e quentes; o aparelho é neutro e mais escuro.
  creme: (r, g, b) => Math.abs(r - b) <= 6 && lum(r, g, b) < 200,
  // Sobre madeira: a madeira é bem quente; o aparelho é neutro.
  madeira: (r, g, b) => Math.abs(r - b) <= 12,
}[fundo];

const { data, info } = await sharp(entrada).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height;
const aparelho = (x, y) => {
  const i = (y * W + x) * 4;
  return data[i + 3] > 200 && ehAparelho(data[i], data[i + 1], data[i + 2]);
};
// Exige 3 pixels seguidos de aparelho, para um pixel isolado do fundo não enganar.
const SEGUIDOS = 3;

const esq = new Int32Array(H).fill(-1), dir = new Int32Array(H).fill(-1);
for (let y = 0; y < H; y++) {
  for (let x = 0; x <= W - SEGUIDOS; x++) {
    let ok = true; for (let k = 0; k < SEGUIDOS; k++) if (!aparelho(x + k, y)) { ok = false; break; }
    if (ok) { esq[y] = x; break; }
  }
  for (let x = W - 1; x >= SEGUIDOS - 1; x--) {
    let ok = true; for (let k = 0; k < SEGUIDOS; k++) if (!aparelho(x - k, y)) { ok = false; break; }
    if (ok) { dir[y] = x; break; }
  }
}
const topo = new Int32Array(W).fill(-1), base = new Int32Array(W).fill(-1);
for (let x = 0; x < W; x++) {
  for (let y = 0; y <= H - SEGUIDOS; y++) {
    let ok = true; for (let k = 0; k < SEGUIDOS; k++) if (!aparelho(x, y + k)) { ok = false; break; }
    if (ok) { topo[x] = y; break; }
  }
  for (let y = H - 1; y >= SEGUIDOS - 1; y--) {
    let ok = true; for (let k = 0; k < SEGUIDOS; k++) if (!aparelho(x, y - k)) { ok = false; break; }
    if (ok) { base[x] = y; break; }
  }
}

// A silhueta real é suave; um pico isolado numa linha ou coluna (sombra escura do mockup que
// passou por aparelho) vira "espinho" na borda. Mediana de 41 vizinhos (numa curva monotônica, como o canto do aparelho, a mediana não deforma nada) remove esses picos.
function mediana(bordas) {
  const r = 20, saida = Int32Array.from(bordas);
  for (let i = 0; i < bordas.length; i++) {
    const viz = [];
    for (let j = i - r; j <= i + r; j++) if (j >= 0 && j < bordas.length && bordas[j] >= 0) viz.push(bordas[j]);
    if (bordas[i] >= 0 && viz.length) { viz.sort((a, b) => a - b); saida[i] = viz[viz.length >> 1]; }
  }
  return saida;
}
for (const arr of [esq, dir, topo, base]) arr.set(mediana(arr));

// Máscara = dentro da faixa da linha E dentro da faixa da coluna; depois erosão de 1px (tira a
// franja de transição com o fundo) e um leve desfoque na borda (anti-serrilhado).
const N = W * H;
const mascara = new Uint8Array(N);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  if (esq[y] >= 0 && x >= esq[y] && x <= dir[y] && topo[x] >= 0 && y >= topo[x] && y <= base[x]) mascara[y * W + x] = 255;
}
const erodida = new Uint8Array(N);
for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
  const p = y * W + x;
  erodida[p] = mascara[p] && mascara[p - 1] && mascara[p + 1] && mascara[p - W] && mascara[p + W] ? 255 : 0;
}
const alfa = new Uint8Array(N);
for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
  let soma = 0;
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) soma += erodida[(y + dy) * W + x + dx];
  alfa[y * W + x] = Math.round(soma / 9);
}

const rgba = Buffer.from(data);
let minX = W, minY = H, maxX = 0, maxY = 0;
for (let p = 0; p < N; p++) {
  rgba[p * 4 + 3] = Math.min(rgba[p * 4 + 3], alfa[p]);
  if (alfa[p] > 8) {
    const x = p % W, y = (p / W) | 0;
    if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
}
const recorte = { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
let img = sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).extract(recorte);
img = saida.endsWith('.webp') ? img.webp({ quality: 92, alphaQuality: 100 }) : img.png();
await img.toFile(saida);
console.log(saida.split('/').pop(), `${recorte.width}x${recorte.height}`);
