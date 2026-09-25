// Abertura/fechamento animados do FAQ (CLAUDE.md, seção 5: "transições curtas... na abertura
// do FAQ"). Sem JavaScript, o <details> nativo já abre e fecha normalmente, sem transição —
// é o fallback. Anima só "height" do próprio <details>, ligado/desligado por JS, então não
// interfere na navegação por teclado nem na semântica de abre/fecha.
function preparar(details) {
  const summary = details.querySelector('summary');
  if (!summary) return;

  let animacao = null;

  summary.addEventListener('click', (evento) => {
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduzido || typeof details.animate !== 'function') return; // deixa o navegador abrir/fechar normal

    evento.preventDefault();
    if (details.open) {
      fechar();
    } else {
      abrir();
    }
  });

  function abrir() {
    details.style.overflow = 'hidden';
    details.style.height = `${details.offsetHeight}px`;
    details.open = true;
    const alturaFinal = details.scrollHeight;

    animacao?.cancel();
    animacao = details.animate({ height: [details.style.height, `${alturaFinal}px`] }, { duration: 220, easing: 'ease-out' });
    animacao.onfinish = limpar;
  }

  function fechar() {
    details.style.overflow = 'hidden';
    const alturaInicial = details.offsetHeight;

    animacao?.cancel();
    animacao = details.animate(
      { height: [`${alturaInicial}px`, `${summary.offsetHeight}px`] },
      { duration: 180, easing: 'ease-out' },
    );
    animacao.onfinish = () => {
      details.open = false;
      limpar();
    };
  }

  function limpar() {
    details.style.removeProperty('height');
    details.style.removeProperty('overflow');
  }
}

document.querySelectorAll('.pergunta').forEach(preparar);
