// Demo (CLAUDE.md, seções 4.4 e 5).
//
// Desktop: rolagem guiada. Conforme o visitante rola pelas etapas de texto, a moldura fixa à
// direita troca de captura para acompanhar a etapa em foco. Sem sequestrar a rolagem.
//
// Celular: cada captura entra pela lateral da página quando chega na tela, alternando os lados.
// O estado inicial escondido só existe depois que este script marca a seção com
// "demo--animar" — sem JavaScript, ou com movimento reduzido, as imagens já estão no lugar.
const demo = document.querySelector('.demo');
const passos = document.querySelectorAll('.demo .etapa');
const itensDoPainel = document.querySelectorAll('.demo__painel-item');

if (demo && passos.length && 'IntersectionObserver' in window) {
  // Rolagem guiada (a moldura só aparece a partir de 861px, mas trocar a classe é inofensivo)
  const definirEtapaAtiva = (numero) => {
    itensDoPainel.forEach((item) => item.classList.toggle('ativo', item.dataset.etapa === numero));
  };
  const observadorPainel = new IntersectionObserver(
    (entradas) => entradas.forEach((e) => e.isIntersecting && definirEtapaAtiva(e.target.dataset.etapa)),
    // Só conta a etapa quando ela cruza uma faixa fina perto do centro da tela.
    { rootMargin: '-45% 0px -45% 0px' },
  );
  passos.forEach((passo) => observadorPainel.observe(passo));

  // Entrada lateral no celular
  const celular = window.matchMedia('(max-width: 860px)').matches;
  const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (celular && !reduzido) {
    demo.classList.add('demo--animar');
    const observadorEntrada = new IntersectionObserver(
      (entradas, obs) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('visivel');
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.25 },
    );
    demo.querySelectorAll('.etapa__captura').forEach((c) => observadorEntrada.observe(c));
  }
}
