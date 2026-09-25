// Busca digitada (CLAUDE.md, seções 5 e 6.2): alterna as frases de BUSCAS, digitando e
// apagando. Decorativo (o elemento já é aria-hidden no HTML). Sem preferência de movimento
// reduzido, mantém a primeira frase parada, como já está no HTML por padrão.
const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduzido) {
  document.querySelectorAll('[data-buscas]').forEach((elemento) => {
    let frases;
    try {
      frases = JSON.parse(elemento.dataset.buscas);
    } catch {
      return;
    }
    if (!Array.isArray(frases) || frases.length < 2) return;

    let indice = 0;
    let temporizador;

    function digitar(frase, posicao, aoTerminar) {
      elemento.textContent = frase.slice(0, posicao);
      temporizador =
        posicao < frase.length
          ? setTimeout(() => digitar(frase, posicao + 1, aoTerminar), 42)
          : setTimeout(aoTerminar, 1600);
    }

    function apagar(frase, posicao, aoTerminar) {
      elemento.textContent = frase.slice(0, posicao);
      temporizador =
        posicao > 0 ? setTimeout(() => apagar(frase, posicao - 1, aoTerminar), 22) : setTimeout(aoTerminar, 350);
    }

    function proximaFrase() {
      const frase = frases[indice];
      digitar(frase, 0, () => {
        apagar(frase, frase.length, () => {
          indice = (indice + 1) % frases.length;
          proximaFrase();
        });
      });
    }

    // Evita trabalho à toa com a aba em segundo plano.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearTimeout(temporizador);
    });

    proximaFrase();
  });
}
