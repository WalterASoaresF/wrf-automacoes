// Botão de modo escuro do cabeçalho.
// Sem escolha gravada, o site segue o tema do sistema (CSS em tokens.css). Ao clicar, a escolha
// vai para o <html data-theme> e fica guardada no navegador (localStorage, não é cookie nem
// rastreamento). O script que aplica a escolha antes da primeira pintura está no <head>
// (Base.astro), para a página não piscar no tema errado.
const botao = document.querySelector('[data-tema-botao]');
const sistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)');
const raiz = document.documentElement;

if (botao) {
  const escuroAgora = () => (raiz.dataset.theme ? raiz.dataset.theme === 'dark' : sistemaEscuro.matches);
  const refletir = () => botao.setAttribute('aria-pressed', String(escuroAgora()));

  botao.hidden = false;
  refletir();

  botao.addEventListener('click', () => {
    const novo = escuroAgora() ? 'light' : 'dark';
    raiz.dataset.theme = novo;
    try {
      localStorage.setItem('tema', novo);
    } catch {
      // navegação privada: vale só para esta visita
    }
    refletir();
  });

  // Se a pessoa não escolheu nada e o sistema mudar, o botão acompanha
  sistemaEscuro.addEventListener('change', refletir);
}
