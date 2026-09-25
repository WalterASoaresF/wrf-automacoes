// Toda configuração que pode mudar fica aqui (CLAUDE.md, seção 3).
// Componentes só leem daqui; nunca repetir esses valores neles.

export const SITE = {
  nome: 'WRF Automações',
  url: 'https://wrf-automacoes.pages.dev',
  titulo: 'WRF Automações | Presença digital e automação para negócios em Salvador',
  descricao:
    'Site preparado para o Google e para a IA, e software sob medida para tirar o trabalho repetitivo do seu negócio. Salvador e Lauro de Freitas.',
  areaAtendida: ['Salvador', 'Lauro de Freitas'],
  estado: 'BA',
  cidadesTexto: 'Salvador e Lauro de Freitas, BA',
};

// WhatsApp
export const WHATSAPP_NUMERO = '5571982401839';
export const WHATSAPP_EXIBICAO = '+55 71 98240-1839';
export const WHATSAPP_MENSAGEM =
  'Olá! Vim pelo site da WRF Automações. Tenho um restaurante e quero saber como sair na frente da concorrência. Nome do restaurante:';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`;

// Formulário do diagnóstico (Tally ou Google Forms).
// Enquanto for 'FORM_URL_PENDENTE', o botão aparece desabilitado como "Diagnóstico em breve".
export const FORM_URL: string = 'https://tally.so/r/QKL4g1';
export const FORM_PENDENTE = FORM_URL === 'FORM_URL_PENDENTE';

// Textos dos CTAs, iguais no hero e na chamada final
export const CTA = {
  whatsapp: {
    texto: 'Quero sair na frente da concorrência',
    nota: 'Conversa rápida pelo WhatsApp, sem compromisso.',
  },
  diagnostico: {
    texto: 'Fazer diagnóstico gratuito',
    textoPendente: 'Diagnóstico em breve',
    nota: 'Leva 2 minutos. Mostramos onde o seu negócio perde tempo e dinheiro.',
    notaPendente: 'O formulário ainda não está no ar. Enquanto isso, fale com a gente pelo WhatsApp.',
  },
  whatsappCurto: 'Falar no WhatsApp',
};

// Capturas do Casa do Dendê. O arquivo vai em src/assets/capturas/<arquivo>.
// Se o arquivo ainda não existir, o site mostra uma moldura marcada como "captura pendente".
// Refazer a partir da build de produção, sem marcas de terceiros (CLAUDE.md, seção 11).
export type Formato = 'celular' | 'tela';

export interface Captura {
  arquivo: string;
  formato: Formato;
  alt: string;
}

export const CAPTURAS = {
  site: {
    arquivo: 'landingpage.webp',
    formato: 'celular',
    alt: 'Página inicial do site do Casa do Dendê no celular, com nome do restaurante, avaliação e botão para ver o cardápio.',
  },
  qrcode: {
    arquivo: 'QrCodeSendoLido.png',
    formato: 'celular',
    alt: 'Cliente apontando o celular para o QR Code na mesa do Casa do Dendê, abrindo o cardápio digital.',
  },
  cardapio: {
    arquivo: 'cardapio.webp',
    formato: 'celular',
    alt: 'Cardápio digital do Casa do Dendê com foto, descrição e preço de cada prato, separados por categoria.',
  },
  carrinho: {
    // Publicada a pedido do time, mesmo mostrando a sugestão de Heineken (contraria a seção 9 do
    // CLAUDE.md, "não negociável") e o indicador de modo de desenvolvimento (seção 11). Trocar
    // por uma versão sem marca de terceiro assim que houver uma.
    arquivo: 'carrinhocardapio.webp',
    formato: 'celular',
    alt: 'Carrinho do pedido com aipim frito e batata frita escolhidos, e sugestões de bebida para acompanhar.',
  },
  painelPedidos: {
    arquivo: 'telagarcompainel.png',
    formato: 'tela',
    alt: 'Painel de pedidos do Casa do Dendê num tablet, com as mesas numeradas de 1 a 10; a mesa 10 aparece destacada por ter um pedido em aberto.',
  },
  painelResultados: {
    arquivo: 'pdvmetricas.webp',
    formato: 'tela',
    alt: 'Painel de resultados com o faturamento dos últimos 7 dias e quanto as sugestões automáticas venderam a mais, com números simulados.',
  },
  avaliacao: {
    arquivo: 'telaavaliacao.png',
    formato: 'celular',
    alt: 'Tela de avaliação depois do pedido, com notas para comida e atendimento e um campo opcional de comentário, sem pedir identificação do cliente.',
  },
} satisfies Record<string, Captura>;

export type ChaveCaptura = keyof typeof CAPTURAS;

// Busca de exemplo mostrada no hero e na etapa 1 da demo (decorativa)
export const BUSCAS = [
  'onde comer moqueca no Rio Vermelho',
  'restaurante aberto agora perto de mim',
  'melhor acarajé de Salvador',
];

export const RESULTADO_EXEMPLO = {
  nome: 'Casa do Dendê',
  descricao: 'Restaurante baiano · Moquecas, acarajé e petiscos',
  detalhe: 'Cardápio com fotos · Aberto hoje',
};

// Hero (seção 6.2)
// Enxuto de propósito: no celular o hero precisa caber em pouco mais de uma tela.
// A caixa de busca animada saiu daqui e vive só na etapa 1 da demo.
export const HERO = {
  titulo: 'Quando procuram o que você vende, você aparece antes do concorrente?',
  apoio: 'A WRF coloca seu negócio na internet e tira o trabalho repetitivo da sua equipe.',
};

// Dado citado no hero. Fonte externa informada pela equipe: conferir o texto exato e o
// público do estudo antes de publicar (CLAUDE.md, seção 9: nenhum número sem fonte real).
export const ESTUDO = {
  numero: '46%',
  texto: 'dos entrevistados recorrem à tecnologia para pesquisar produtos ou serviços antes de comprar.',
  fonte: 'Estudo Prompt-me (Fbiz e On The Go), set. 2026',
};

// Dores (seção 6.3)
export const DORES_TITULO = 'Isso acontece no seu negócio?';
export const DORES = [
  'Quem procura na internet encontra o seu concorrente, não você.',
  'Tudo ainda é feito à mão, sem nenhum sistema, e o negócio passa uma imagem de ultrapassado.',
  'No horário de pico vira bagunça, e quem sente é o cliente.',
  'Sua equipe gasta horas em tarefas repetitivas em vez de cuidar do que faz o negócio crescer.',
];

// Serviços (seção 6.4): cartões em rolagem horizontal. O último é o fechamento ("O resultado?").
export const SERVICOS_TITULO = 'O que a WRF vai fazer por você';
export type IconeServico = 'busca' | 'engrenagem' | 'pessoa' | 'grafico';
export const SERVICOS: { rotulo: string; texto: string; nota?: string; icone?: IconeServico; destaque?: boolean }[] = [
  {
    rotulo: 'Encontrado no Google e na IA',
    icone: 'busca',
    texto: 'Seu negócio preparado para aparecer nas buscas do Google e ser recomendado por ferramentas de IA, como o ChatGPT.',
    nota: 'Ninguém sério garante o primeiro lugar. Garantimos um site pronto para disputá-lo.',
  },
  {
    rotulo: 'Menos trabalho repetitivo',
    icone: 'engrenagem',
    texto: 'As tarefas que tomam horas da sua equipe passam a ser feitas por um software desenvolvido só para a sua empresa.',
  },
  {
    rotulo: 'Cliente mais bem atendido',
    icone: 'pessoa',
    texto: 'Uma experiência melhor para o seu cliente, do primeiro clique até depois da compra, e uma presença digital à altura do seu negócio.',
  },
  {
    rotulo: 'Resultado comprovado',
    icone: 'grafico',
    texto: 'Você recebe uma análise das métricas de antes e depois do nosso trabalho, para ver o resultado nos seus próprios números.',
  },
  {
    rotulo: 'O resultado?',
    texto: 'Cliente mais satisfeito, equipe menos sobrecarregada e mais dinheiro no seu bolso.',
    destaque: true,
  },
];

// Demo (seção 6.5). A etapa 1 usa a busca desenhada em código, sem marca de buscador.
// O Casa do Dendê já é apresentado como fictício no hero; aqui só a etapa com números
// ganha a nota "números simulados" (seção 9).
export const DEMO_TITULO = 'O que fazemos por um restaurante';
export const DEMO_INTRO =
  'O caminho de um pedido, da busca no Google ao painel do dono, no Casa do Dendê, restaurante fictício que criamos para demonstração. Em outro tipo de negócio, adaptamos cada etapa à sua demanda.';

export const DEMO_ETAPAS: { texto: string; captura: ChaveCaptura | 'busca'; nota?: string }[] = [
  { texto: 'O cliente pergunta ao Google ou a uma IA onde comer.', captura: 'busca' },
  { texto: 'Encontra o site do restaurante.', captura: 'site' },
  { texto: 'Na mesa, escaneia o QR Code.', captura: 'qrcode' },
  { texto: 'Monta o pedido pelo cardápio.', captura: 'cardapio' },
  { texto: 'O cardápio sugere uma bebida, e ele aceita.', captura: 'carrinho' },
  { texto: 'Depois do pedido, ele avalia a experiência sem precisar se identificar.', captura: 'avaliacao' },
  {
    texto: 'O dono vê quanto as sugestões venderam a mais.',
    captura: 'painelResultados',
    nota: 'Números simulados do restaurante de demonstração.',
  },
];

// Como funciona (seção 6.6)
export const PASSOS = [
  'Diagnóstico gratuito: você responde um questionário rápido sobre o seu negócio.',
  'Reunião online ou presencial para entender suas demandas e onde estão os gargalos.',
  'Colocamos seu negócio na internet com um site profissional e montamos a estrutura digital de que ele precisa.',
  'Acompanhamos os resultados com você.',
];

// Time (seção 6.7). Foto real em src/assets/time/<foto>. Nunca gerar foto com IA.
// Sem foto ainda, o bloco mostra "Foto real pendente".
export const TIME_INTRO = 'Somos três sócios. Cada um cuida de uma parte do que entregamos.';

export const TIME: {
  area: string;
  descricao: string;
  nome: string | null;
  frase: string | null;
  foto: string;
}[] = [
  {
    area: 'Negócios e operação',
    descricao: 'O empreendedor da equipe. Cuida da relação com o seu negócio e da implantação.',
    nome: 'João Felix',
    frase: 'Está à disposição para te atender da melhor forma possível.',
    foto: 'joao-felix.jpg',
  },
  {
    area: 'Direito e contratos',
    descricao: 'Cuida de contratos claros e do uso responsável dos dados, de acordo com a LGPD.',
    nome: 'Gustavo Rios',
    frase: 'Papelada, contrato e parte jurídica? Disso a gente cuida, sem dor de cabeça para você.',
    foto: 'gustavo-rios.jpg',
  },
  {
    area: 'Desenvolvedor Fullstack',
    descricao: 'Constrói e mantém o site e os sistemas de cada cliente.',
    nome: 'Walter Soares',
    frase: 'Ouve suas demandas com atenção e usa o que sabe para desenvolver o software ideal para o seu negócio.',
    foto: 'walter-soares.jpg',
  },
];

// Chamada final (seção 6.9)
export const CTA_FINAL_TITULO = 'Seu concorrente já está sendo encontrado. E o seu negócio?';

// FAQ (seção 6.8). Pergunta com resposta null não aparece na página nem no JSON-LD.
export const FAQ: { pergunta: string; resposta: string | null }[] = [
  {
    pergunta: 'Preciso jogar fora meu cardápio impresso?',
    resposta: 'Não. O digital funciona junto com o impresso.',
  },
  {
    pergunta: 'O sistema cobra do cliente?',
    resposta: 'Não. O pagamento continua como hoje, na maquininha, com Pix, crédito ou débito.',
  },
  {
    pergunta: 'Funciona com o iFood?',
    resposta: 'Hoje não integramos com o iFood. O foco é o atendimento dentro do restaurante.',
  },
  {
    pergunta: 'As sugestões são inteligência artificial?',
    resposta:
      'São regras automáticas montadas com você, como "quem pede entrada ganha sugestão de bebida". Você decide o que é sugerido.',
  },
  {
    pergunta: 'Vocês guardam dados dos meus clientes?',
    resposta: 'O cardápio não pede nome, telefone nem CPF de quem faz o pedido.',
  },
  {
    pergunta: 'Quanto tempo leva para ficar pronto?',
    resposta:
      'Depende do tamanho do cardápio e das necessidades do seu restaurante. Em média, uma semana.',
  },
];

export const FAQ_PUBLICADO = FAQ.filter(
  (item): item is { pergunta: string; resposta: string } => item.resposta !== null,
);
