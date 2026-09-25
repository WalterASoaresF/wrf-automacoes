// Setas da trilha de serviços: rolam um cartão por vez e ficam desabilitadas nas pontas.
// Sem JavaScript as setas continuam escondidas e a trilha rola normalmente (dedo, trackpad, teclado).
const trilha = document.querySelector('[data-servicos-trilha]');
const setas = document.querySelector('[data-servicos-setas]');

if (trilha && setas) {
  const [anterior, proximo] = setas.querySelectorAll('button');
  const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)');

  const passo = () => {
    const cartao = trilha.querySelector('li');
    const gap = parseFloat(getComputedStyle(trilha).columnGap) || 0;
    return cartao ? cartao.getBoundingClientRect().width + gap : trilha.clientWidth * 0.8;
  };

  const atualizar = () => {
    const fim = trilha.scrollWidth - trilha.clientWidth - 2;
    anterior.disabled = trilha.scrollLeft <= 2;
    proximo.disabled = trilha.scrollLeft >= fim;
    // Se tudo cabe na tela, as setas não servem para nada.
    setas.hidden = trilha.scrollWidth <= trilha.clientWidth + 2;
  };

  setas.addEventListener('click', (evento) => {
    const botao = evento.target.closest('button[data-direcao]');
    if (!botao) return;
    trilha.scrollBy({
      left: Number(botao.dataset.direcao) * passo(),
      behavior: reduzido.matches ? 'auto' : 'smooth',
    });
  });

  trilha.addEventListener('scroll', atualizar, { passive: true });
  window.addEventListener('resize', atualizar);
  atualizar();
}
