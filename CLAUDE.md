# CLAUDE.md — Site institucional WRF Automações

> Referência permanente do projeto do site da WRF. Este repositório é separado do projeto do cardápio (Casa do Dendê). Toda decisão abaixo deve ser respeitada; mudanças exigem atualizar este arquivo primeiro.

---

## 1. Objetivo do site

Uma landing page única, voltada a donos de negócio (com foco atual em restaurantes), que gera dois tipos de contato:

1. **Diagnóstico gratuito:** o visitante preenche um questionário curto sobre os gargalos do negócio.
2. **Conversa no WhatsApp:** o visitante abre uma mensagem pronta para o WhatsApp da WRF.

O site precisa deixar claro, em linguagem de dono de negócio, que a WRF vende:

- **Posicionamento digital:** o negócio preparado para aparecer no Google e nas respostas de ferramentas de IA (SEO e GEO), com site profissional.
- **Automação:** software desenvolvido para a empresa, que assume tarefas repetitivas da equipe.
- **Prova de resultado:** análise de métricas de antes e depois do trabalho.
- **Para restaurantes (exemplo demonstrado na página):** cardápio digital com QR Code, sugestões automáticas e painel de pedidos por mesa.

> Revisão de 25/09/2026: o escopo, antes exclusivo de restaurantes, passou a "negócios, com foco em restaurantes", a pedido da equipe. A demo continua sendo um restaurante.

O próprio site é a prova de competência: ele precisa ser rápido, bem ranqueado e bem estruturado para IA. Um site lento ou mal indexado vendendo SEO derruba a credibilidade da WRF.

---

## 2. Custo zero: hospedagem, domínio e deploy

| Item | Escolha | Motivo |
|---|---|---|
| Hospedagem | **Cloudflare Pages (plano gratuito)** | Permite uso comercial no plano grátis, CDN global, HTTPS automático, deploy a cada push no GitHub |
| URL | `wrf-automacoes.pages.dev` (verificar disponibilidade do nome) | Subdomínio limpo e gratuito |
| Código | Repositório no GitHub (grátis) | Deploy automático conectado ao Cloudflare Pages |
| Analytics | **Cloudflare Web Analytics** (grátis) | Não usa cookies, então não exige banner de cookies |
| Formulário do diagnóstico | **Tally** (grátis) ou Google Forms | Fora do site; a landing só leva até ele |

**Não usar Vercel no plano gratuito (Hobby):** os termos da Vercel restringem o plano Hobby a uso pessoal e não comercial, e um site que divulga serviços pagos conta como uso comercial.

**Nota honesta sobre domínio:** não existe domínio `.com.br` gratuito. O registro no Registro.br custa cerca de R$ 40 por ano. Recomendação da equipe: começar em `pages.dev` e registrar `wrfautomacoes.com.br` assim que o primeiro cliente pagar, porque uma empresa que vende posicionamento digital usando subdomínio de terceiro enfraquece o discurso. A troca é simples: o Cloudflare Pages aceita domínio próprio sem custo adicional.

---

## 3. Stack

- **Astro** (site estático). Justificativa: gera HTML puro e não envia JavaScript por padrão, o que favorece carregamento, SEO e leitura por IA. Os arquivos `.astro` são praticamente HTML e CSS, o que mantém o código simples de entender pela equipe.
- **Interatividade em JavaScript puro** (arquivos pequenos em `src/scripts/`), carregada só nas seções que precisam. Usar React apenas se algum componente ficar realmente complexo demais para JS puro, e nesse caso como ilha isolada do Astro (`client:visible`).
- **CSS próprio com variáveis** (tokens em `src/styles/tokens.css`). Tailwind é opcional; se usado, os tokens continuam sendo a fonte da verdade.
- **Fontes auto-hospedadas** via `@fontsource-variable/archivo`, sem chamar o Google Fonts em tempo de execução (melhor desempenho e nenhuma requisição a terceiros).
- **Imagens** pelo componente `<Image />` do Astro (gera AVIF/WebP, define largura e altura, evita salto de layout).

### Estrutura de pastas

```
wrf-site/
├── CLAUDE.md
├── .claude/skills/frontend-design/SKILL.md
├── astro.config.mjs
├── public/
│   ├── favicon.svg              (símbolo do losango)
│   ├── og-image.png             (1200x630, para compartilhamento)
│   ├── robots.txt
│   └── llms.txt                 (resumo do site para ferramentas de IA — opcional, ver seção 8)
└── src/
    ├── data/site.ts             (número do WhatsApp, mensagem pronta, link do formulário, dados do time, FAQ)
    ├── layouts/Base.astro       (head, meta tags, JSON-LD, fontes)
    ├── pages/index.astro        (monta as seções na ordem)
    ├── components/              (uma seção por arquivo: Header, Hero, Dores, Pilares, Demo, ComoFunciona, Time, Faq, CtaFinal, Footer)
    ├── scripts/                 (busca-animada.js, demo-scroll.js, revelar.js)
    ├── styles/tokens.css, global.css
    └── assets/                  (logo, capturas do Casa do Dendê, fotos do time)
```

Toda configuração que pode mudar (telefone, mensagem, link do formulário, nomes do time, perguntas do FAQ) fica em `src/data/site.ts`. Nunca espalhar esses valores pelos componentes.

---

## 4. Plano de design

### 4.1 Ponto de partida: a marca

O logo é preto sobre branco, geométrico: um losango precedido de duas setas que indicam avanço. O nome "WRF" é pesado e largo; "AUTOMAÇÕES" é largo e espaçado. O site herda três ideias disso: **preto e branco de verdade**, **formas largas**, e **movimento para a frente** (as setas).

### 4.2 Cores

| Nome | Hex | Uso |
|---|---|---|
| Preto WRF | `#000000` | Texto principal, fundos das seções escuras, logo |
| Branco | `#FFFFFF` | Fundo principal, texto sobre preto |
| Névoa | `#EEF0F3` | Fundo alternado de seções (cinza frio, não creme) |
| Grafite | `#565B63` | Texto secundário (contraste acima de 6:1 sobre branco) |
| Linha | `#D5D8DD` | Bordas e divisórias |
| Cobalto | `#1E3CF5` | Única cor de destaque: botões principais, links, estados ativos |

**Por que cobalto:** as capturas do Casa do Dendê são em tons de dendê (laranja terroso). Um site preto e branco com um azul cobalto faz essas telas se destacarem como a parte colorida da página, já que azul e laranja são cores complementares. O azul também comunica confiança e tecnologia, adequado a uma equipe com área jurídica e de engenharia. Texto branco sobre cobalto tem contraste acima de 7:1.

### 4.3 Tipografia

Uma única família, **Archivo** (variável, com eixo de largura), usada em duas larguras:

- **Títulos:** Archivo expandido (largura ~125), peso 800. Ecoa o "WRF" largo do logo. Títulos em caixa normal (só a primeira letra maiúscula), nunca tudo em maiúsculas.
- **Texto corrido e interface:** Archivo largura normal, peso 400/500, altura de linha 1,6, até 70 caracteres por linha.
- Escala: 16 / 20 / 26 / 36 / 52 / 72 px (títulos grandes com `clamp()` para o celular).

Maiúsculas espaçadas ficam restritas ao logo. Não criar rótulos em caixa alta acima dos títulos.

### 4.4 O elemento memorável (onde o site é ousado)

A seção **"Um pedido do começo ao fim"** (Demo): uma rolagem guiada em que o texto à esquerda avança por sete etapas e, à direita, uma moldura de celular fixa troca de tela a cada etapa, mostrando o Casa do Dendê funcionando. Esse é o único lugar do site com efeito grande. O resto da página é calmo e organizado, para que a demo seja o que o visitante lembra.

### 4.5 Layout

Conteúdo alinhado à esquerda em todas as seções (mais fácil de ler que centralizado). Largura máxima do texto de ~70 caracteres; largura máxima da página de ~1200 px.

Hero (desktop):
```
┌──────────────────────────────────────────────────────────────┐
│ [logo WRF]                     Como funciona  Time  [WhatsApp]│
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Mais clientes te encontram.          ┌──────────────────┐   │
│  Menos trabalho na hora do pedido.    │ 🔍 onde comer     │   │
│                                       │   moqueca no Rio  │   │
│  Texto de apoio (2 linhas)            │   Vermelho▌       │   │
│                                       ├──────────────────┤   │
│  [Quero sair na frente]  [Diagnóstico │ resultado:        │   │
│   (WhatsApp, cobalto)     gratuito]   │ Casa do Dendê ... │   │
│                                       └──────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```
No celular, a caixa de busca animada vem abaixo dos botões.

Demo (desktop — rolagem guiada):
```
┌──────────────────────────────────────────────────────────────┐
│  1  O cliente pergunta ao Google       ┌─────────┐           │
│     ou a uma IA onde comer.            │         │  ← moldura│
│                                        │  tela   │    fixa   │
│  2  Encontra o site do restaurante.    │  muda a │  (sticky) │
│                                        │  cada   │           │
│  3  Na mesa, escaneia o QR Code.       │  etapa  │           │
│  ...                                   └─────────┘           │
│  7  O dono vê quanto as sugestões                            │
│     venderam a mais.                                          │
└──────────────────────────────────────────────────────────────┘
```
No celular: sem moldura fixa. Cada etapa vira um bloco com a captura logo abaixo do texto, rolagem normal.

### 4.6 Revisão do plano contra padrões genéricos (feita antes de construir)

- **Rejeitado:** fundo creme com serifa alta e destaque terracota. É o visual mais comum de páginas geradas por IA e é exatamente o visual do Casa do Dendê. A marca WRF precisa ser diferente do produto que ela demonstra.
- **Rejeitado:** fundo quase preto com um único verde-ácido. Também é um padrão genérico de "site de tecnologia". Aqui o preto é o `#000` do logo, usado em seções específicas, e o destaque é cobalto.
- **Revisto em 25/09/2026:** os três pilares em linhas alternadas com captura viraram cartões em rolagem horizontal (seção 6.4), a pedido da equipe. Para não cair na "grade de cartões iguais", os cartões ficam numa trilha que sangra até a borda da tela, com ícone que reage ao toque e um cartão final de destaque.
- **Mantido com justificativa:** numeração 1 a 7 na demo e 1 a 4 em "Como funciona", porque ali o conteúdo é de fato uma sequência.

---

## 5. Movimento e interatividade

Regra geral: **toda animação melhora a leitura, nunca a atrasa.** O conteúdo inteiro precisa estar no HTML e visível mesmo se o JavaScript falhar.

| Efeito | Onde | Como |
|---|---|---|
| Entrada do hero | Topo, ao carregar | O logo desliza da esquerda e todo o texto do hero sobe letra a letra, de dentro de cada palavra (componente TextoRevelado, só CSS). Botões, dado citado e busca sobem em bloco logo depois. Duração total por volta de 1 segundo. |
| Busca digitada | Demo, etapa 1 | Texto que se digita e apaga, alternando buscas reais de clientes ("onde comer moqueca no Rio Vermelho", "restaurante aberto agora perto de mim", "melhor acarajé de Salvador"). Elemento decorativo com `aria-hidden="true"`; o título H1 é texto fixo. |
| Rolagem guiada | Demo (desktop) | `IntersectionObserver` troca a tela da moldura quando cada etapa entra na tela. Sem sequestrar a rolagem. |
| Entrada lateral | Demo (celular) | Cada captura desliza da lateral para o lugar ao entrar na tela, alternando os lados. Sem JS ou com movimento reduzido, já nasce no lugar. |
| Cartões de serviço | Seção 6.4 | Rolagem horizontal com encaixe; hover levanta o cartão e preenche o ícone. |
| Respostas a toque | Botões, FAQ | Transições curtas em hover, foco e abertura do FAQ. |

**Proibido:**
- Rolagem suave sequestrada (bibliotecas que substituem a rolagem nativa). Prejudica acessibilidade e parece travada no celular.
- Sequências de centenas de quadros controladas pela rolagem (efeito "3D scroll" feito com vídeo fatiado). Pesam vários megabytes e derrubam o desempenho.
- Esconder texto com `opacity: 0` via CSS sem fallback. Usar a classe `.js` no `<html>` (adicionada por script) para que o estado inicial escondido só exista quando o JS estiver rodando.
- Animar propriedades que causam recálculo de layout. Animar só `transform` e `opacity`.

**Obrigatório:** respeitar `prefers-reduced-motion`. Com essa preferência, nenhuma animação automática roda: a busca mostra uma frase fixa e a demo troca de tela sem transição.

### 5.1 Uso do Higgsfield

O Higgsfield gera imagens e vídeos com IA e consome créditos pagos. Ele não produz interatividade; a interatividade é feita em código. Regras:

- Uso permitido: no máximo **um vídeo curto** (até 6 segundos, sem som, em loop), por exemplo um celular escaneando o QR Code numa mesa, para ilustrar a etapa 3 da demo.
- O vídeo deve ter até 1,5 MB (MP4 e WebM), imagem de capa (`poster`), `preload="none"`, carregamento só quando a seção entra na tela, e não pode ser o maior elemento visível do topo da página.
- Não reproduzir o vídeo com `prefers-reduced-motion` ativo nem com economia de dados do navegador (`Save-Data`).
- **Nunca gerar fotos das pessoas do time com IA.** A seção "Nosso time" usa fotos reais.
- Não gerar imagens que pareçam clientes reais, restaurantes reais ou depoimentos.

---

## 6. Seções e texto (copy)

Tom: direto, de dono para dono, sem jargão sem explicação. Frases curtas, voz ativa. Quando um termo técnico aparecer (SEO, GEO), explicar na mesma frase.

### 6.1 Cabeçalho
Logo, links "Como funciona", "Time", "Dúvidas", e botão "Falar no WhatsApp". No celular, só logo e botão do WhatsApp; os links vão para um menu.

### 6.2 Hero
Enxuto: no celular precisa caber em pouco mais de uma tela. Todo o texto sobe letra a letra ao carregar (seção 5).
- **H1:** "Perdendo clientes para a concorrência porque não te acham na internet?" (em forma de pergunta, para não afirmar algo sobre quem lê).
- **Chamada:** "Na dúvida? Faça o diagnóstico gratuito."
- **Botões, um embaixo do outro:** "Fazer diagnóstico gratuito" (principal, cobalto) e, abaixo, "Quero sair na frente da concorrência" (WhatsApp, contorno). No celular, as notas pequenas abaixo dos botões ficam escondidas no hero (continuam na chamada final, onde a ordem padrão se mantém: WhatsApp em cobalto primeiro).
- **Dado citado, com fonte visível:** "46% dos entrevistados recorrem à tecnologia para pesquisar produtos ou serviços antes de comprar." Fonte: Estudo Prompt-me (Fbiz e On The Go), set. 2026. No desktop ocupa a coluna da direita, com o número grande; no celular fica compacto, depois dos botões. **Conferir o texto exato e o público do estudo antes de publicar** (seção 9).
- A caixa de busca animada saiu do hero (25/09/2026) e vive só na etapa 1 da demo.

### 6.3 Dores (seção curta, fundo Névoa, cartões com ícone)
Título: "Isso acontece no seu negócio?" Cinco cartões com ícone de linha; as frases 3 e 4 continuam de um cartão para o outro (reticências) e o último cartão, em preto, fecha. Em telas largas cabem numa linha; abaixo de 1100px viram trilha com rolagem horizontal e encaixe.
1. "Quem procura na internet encontra o seu concorrente, não você." (lupa)
2. "Tudo ainda é feito à mão, sem nenhum sistema, e o negócio passa uma imagem de ultrapassado." (documento)
3. "No horário de pico vira bagunça: o cliente sente, a organização interna trava e a sua equipe…" (relógio)
4. "…passa horas em tarefas repetitivas em vez de cuidar do que faz o negócio crescer." (setas de repetição)
5. "No fim das contas, você sente que poderia ganhar mais pela qualidade do que vende." (moeda)

### 6.4 O que a WRF vai fazer por você (cartões em rolagem horizontal, sem capturas)
Cartões com ícone de linha, rolagem horizontal com encaixe (scroll-snap), setas no desktop, arrasto no celular. O último cartão, em cobalto, fecha a ideia.
1. **Encontrado no Google e na IA.** "Seu negócio preparado para aparecer nas buscas do Google e ser recomendado por ferramentas de IA, como o ChatGPT." Nota: "Ninguém sério garante o primeiro lugar. Garantimos um site pronto para disputá-lo."
2. **Menos trabalho repetitivo.** "As tarefas que tomam horas da sua equipe passam a ser feitas por um software desenvolvido só para a sua empresa."
3. **Cliente mais bem atendido.** "Uma experiência melhor para o seu cliente, do primeiro clique até depois da compra, e uma presença digital à altura do seu negócio."
4. **Resultado comprovado.** "Você recebe uma análise das métricas de antes e depois do nosso trabalho, para ver o resultado nos seus próprios números."
5. **O resultado?** "Cliente mais satisfeito, equipe menos sobrecarregada e mais dinheiro no seu bolso."

### 6.5 Demo: "O que fazemos por um negócio" (o elemento memorável, fundo branco)
Introdução: "Da busca à compra, da compra ao painel do proprietário. Para demonstrar, usamos o Casa do Dendê, um restaurante fictício. Em outro tipo de negócio, adaptamos cada etapa à sua demanda." Desde que a busca saiu do hero, é aqui que o Casa do Dendê é identificado como fictício (seção 9).

No celular, cada captura entra pela lateral da página quando chega na tela (etapas ímpares pela direita, pares pela esquerda).

Fundo branco, para que a sombra das telas faça sentido. Sete etapas com as capturas do Casa do Dendê:
1. O cliente pergunta ao Google ou a uma IA onde comer, e o restaurante aparece em destaque.
2. Encontra o site do restaurante (captura da landing).
3. Na mesa, escaneia o QR Code.
4. E monta o pedido pelo cardápio (captura do cardápio; o "E" dá continuidade à etapa 3).
5. Mais que um PDF: o cardápio sugere complementos para o pedido, e ele aceita (captura do carrinho com sugestão).
6. Depois do pedido, ele avalia a experiência sem precisar se identificar (captura da tela de avaliação).
7. O proprietário tem um painel onde comprova que as melhorias estão se pagando (captura do painel de resultados). Nota: "Números simulados do restaurante de demonstração."

A caixa de aviso do topo da seção foi removida a pedido da equipe (a introdução já identifica o Casa do Dendê como fictício). A identificação dos números como simulados continua obrigatória e fica na etapa 7, onde eles aparecem (seção 9).

### 6.6 Como funciona (sequência real, numeração permitida)
1. Diagnóstico gratuito: você responde um questionário rápido sobre o seu negócio.
2. Reunião online ou presencial para entender suas demandas e onde estão os gargalos.
3. Colocamos seu negócio na internet com um site profissional e montamos a estrutura digital de que ele precisa.
4. Acompanhamos os resultados com você.

Seguido do botão "Fazer diagnóstico gratuito".

### 6.7 Nosso time (obrigatória)
Só o título "Nosso time", sem texto de abertura. No celular, os três blocos viram uma trilha com rolagem horizontal.

Três blocos com foto real, área, nome, descrição e frase:
- **Negócios e operação — João Felix.** O empreendedor da equipe. Cuida da relação com o seu negócio e da implantação. Frase: "Está à disposição para te atender da melhor forma possível."
- **Jurídico e contratos — Gustavo Rios.** Elabora toda a parte contratual, com atenção ao uso responsável dos seus dados, de acordo com a LGPD. Frase: "Papelada e proteção dos seus dados? Disso a gente cuida, sem dor de cabeça para você."
- **Desenvolvedor Fullstack — Walter Soares.** Constrói e mantém o site e os sistemas de cada cliente. Frase: "Ouve suas demandas com atenção, usa suas habilidades para desenvolver o software ideal para o seu negócio e fica à disposição para ajustá-lo do jeito que você deseja."

Os três sócios são graduandos (Empreendedorismo/Administração, Direito e Engenharia de Software). Por isso os títulos usam a área de atuação ("Jurídico e contratos", "Desenvolvedor Fullstack") em vez de títulos profissionais regulamentados como "Advogado" ou "Engenheiro", que exigem registro em conselho de classe (OAB, CREA) e ainda não se aplicam à equipe.

### 6.8 Dúvidas frequentes (FAQ, abre e fecha)
- "Preciso jogar fora meu cardápio impresso?" Não. O digital funciona junto com o impresso.
- "O sistema cobra do cliente?" Não. O pagamento continua como hoje, na maquininha, com Pix, crédito ou débito.
- "Funciona com o iFood?" Hoje não integramos com o iFood. O foco é o atendimento dentro do restaurante.
- "As sugestões são inteligência artificial?" São regras automáticas montadas com você, como "quem pede entrada ganha sugestão de bebida". Você decide o que é sugerido.
- "Vocês guardam dados dos meus clientes?" O cardápio não pede nome, telefone nem CPF de quem faz o pedido.
- "Quanto tempo leva para ficar pronto?" Depende do tamanho do cardápio e das necessidades do restaurante. Em média, uma semana.

### 6.9 Chamada final (fundo preto)
- Título: "Seu concorrente já está sendo encontrado. E o seu negócio?"
- Os mesmos dois botões do hero.

### 6.10 Rodapé
Logo, WhatsApp, link do diagnóstico, cidade de atuação (Salvador e Lauro de Freitas, BA), ano. Uma linha: "Este site não usa cookies de rastreamento."

### 6.11 Botão fixo no celular
Barra discreta no rodapé da tela, visível depois que o hero sai da tela: "Falar no WhatsApp". Some quando a chamada final está visível, para não duplicar.

---

## 7. Chamadas para ação (CTAs)

| CTA | Destino | Texto do botão |
|---|---|---|
| WhatsApp | `https://wa.me/5571982401839?text=` + mensagem codificada com `encodeURIComponent` | "Quero sair na frente da concorrência" |
| Diagnóstico | Link do formulário (Tally ou Google Forms), abre em nova aba | "Fazer diagnóstico gratuito" |

Mensagem pronta do WhatsApp (guardada em `src/data/site.ts`):

> Olá! Vim pelo site da WRF Automações. Tenho um restaurante e quero saber como sair na frente da concorrência. Nome do restaurante:

Regras:
- O formulário **não é embutido** na página (iframe pesa e atrasa o carregamento). O botão leva até ele.
- Enquanto o link do formulário não existir, o valor em `site.ts` fica como `FORM_URL_PENDENTE` e o botão aparece desabilitado com o texto "Diagnóstico em breve". Nunca publicar com link quebrado.
- Todo botão tem área de toque de pelo menos 44 x 44 px.

---

## 8. SEO, GEO e desempenho (o site é a vitrine do serviço)

### SEO técnico
- Um único H1. Hierarquia de títulos sem saltos.
- `<title>`: "WRF Automações | Presença digital e automação para negócios em Salvador"
- Meta description até 155 caracteres, Open Graph e imagem de compartilhamento 1200 x 630.
- JSON-LD com `Organization` (nome, logo, telefone, área atendida) e `FAQPage` (as mesmas perguntas da seção 6.8, com o mesmo texto visível na página).
- `sitemap.xml` via `@astrojs/sitemap`, `robots.txt` e URL canônica.

### GEO (ser entendido por ferramentas de IA)
- Conteúdo factual e específico em texto (não dentro de imagens): o que a WRF faz, para quem, onde atende, o que não faz.
- `robots.txt` **permite** os robôs de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended). Faz parte do produto que vendemos.
- `public/llms.txt`: resumo em texto do site. É uma convenção nova e não oficial; incluir porque o custo é zero, sem prometer efeito.

### Metas de desempenho (medir com PageSpeed Insights, versão celular)
- Desempenho, Acessibilidade, Boas práticas e SEO: **90 ou mais** cada.
- LCP abaixo de 2,5 s, CLS abaixo de 0,1, INP abaixo de 200 ms.
- JavaScript total da página abaixo de 50 KB comprimido.
- Imagem do topo carregada com prioridade (`loading="eager"`, `fetchpriority="high"`); todas as outras com `loading="lazy"`.

### Acessibilidade
- Contraste mínimo 4,5:1 para texto.
- Foco visível em todos os links e botões (contorno cobalto de 2 px).
- Textos alternativos descritivos em todas as capturas.
- Site navegável só com teclado, incluindo o FAQ.

---

## 9. Honestidade e responsabilidade (não negociável)

A equipe inclui um sócio da área jurídica. O site é propaganda, então vale o Código de Defesa do Consumidor.

- Casa do Dendê sempre identificado como **fictício e de demonstração**, com números **simulados**.
- **Nenhum depoimento, logo de cliente ou número de resultado inventado.** Se não houver cliente real, a seção de depoimentos não existe.
- Não prometer primeira posição no Google ou em IA.
- Não chamar as sugestões de "inteligência artificial".
- Não mencionar nota fiscal, pagamento online ou integração com iFood como recursos.
- Não usar marcas de terceiros nas capturas de marketing (ver seção 11).

---

## 10. Pendências para decidir antes de publicar

**Resolvidas:**
1. ~~Títulos do time~~ — definido: "Negócios e operação", "Direito e contratos", "Desenvolvedor Fullstack" (ver seção 6.7). Todos os três sócios são graduandos.
2. ~~Aviso de Casa do Dendê fictício~~ — confirmado, mantido como está na seção 6.5 e 9.
3. ~~Garrafa da Heineken na captura do carrinho~~ — decisão revista: o time optou por publicar a captura mesmo assim (contraria a seção 9, "não negociável"). Trocar por uma versão sem marca de terceiro quando houver.
4. ~~Nomes dos sócios~~ — João Felix (Negócios e operação), Gustavo Rios (Direito e contratos), Walter Soares (Desenvolvedor Fullstack). Fotos reais e frase de cada um ainda faltam.
5. ~~Link do formulário do diagnóstico~~ — `https://tally.so/r/QKL4g1`.
6. ~~Prazo médio de implantação~~ — "Depende do tamanho do cardápio e das necessidades do seu restaurante. Em média, uma semana." (ver seção 6.8).

**Ainda em aberto:**
7. Foto real de João Felix (as de Gustavo Rios e Walter Soares já estão em `src/assets/time/`; a de João vai em `src/assets/time/joao-felix.jpg`).
8. Confirmar o texto exato e o público do estudo Prompt-me (Fbiz / On The Go) citado no hero.
9. Registro do domínio `.com.br` (quando houver o primeiro cliente pagante).

Refazer as capturas do Casa do Dendê a partir da build de produção (sem o indicador "N" do modo de desenvolvimento) não é bloqueante — pode ser feito em paralelo à construção do site, desde que esteja pronto antes da publicação final.

---

## 11. Assets

- Logo em SVG (vetorizar o PNG, se ainda não existir SVG). O símbolo do losango sozinho vira o favicon.
- Capturas do Casa do Dendê: **refazer a partir da versão de produção** (`npm run build` + `npm run start`). As capturas atuais mostram o indicador "N" do modo de desenvolvimento do Next.js no canto da tela.
- Na captura do carrinho, a sugestão com a garrafa da Heineken foi removida do protótipo — usar a versão sem marca de terceiro antes de qualquer captura para o site de marketing.
- Exportar capturas em PNG de alta resolução; o Astro converte para AVIF/WebP no build.

---

## 12. Ordem de construção

1. Projeto Astro, tokens de cor e tipografia, layout base com meta tags e JSON-LD.
2. Todas as seções com texto final e imagens, **sem nenhuma animação**. Medir PageSpeed nesta etapa e registrar a nota.
3. Adicionar as animações (hero, busca digitada, demo com rolagem guiada, FAQ). Medir de novo: a nota não pode cair abaixo das metas da seção 8.
4. Testar no celular real, com e sem `prefers-reduced-motion`.
5. Publicar no Cloudflare Pages e validar: PageSpeed, Teste de Resultados Avançados do Google (JSON-LD) e os dois CTAs funcionando.
