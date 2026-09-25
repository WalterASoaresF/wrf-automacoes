// Mostra a barra fixa do WhatsApp no celular depois que o hero sai da tela, e esconde de novo
// quando a chamada final (mesmo CTA) entra na tela, para não duplicar (CLAUDE.md, seção 6.11).
const barra = document.querySelector('[data-barra-whatsapp]');
const hero = document.getElementById('hero');
const ctaFinal = document.getElementById('contato');

if (barra && hero && ctaFinal && 'IntersectionObserver' in window) {
  let heroVisivel = true;
  let finalVisivel = false;

  const atualizar = () => {
    barra.classList.toggle('visivel', !heroVisivel && !finalVisivel);
  };

  new IntersectionObserver(([entrada]) => {
    heroVisivel = entrada.isIntersecting;
    atualizar();
  }).observe(hero);

  new IntersectionObserver(([entrada]) => {
    finalVisivel = entrada.isIntersecting;
    atualizar();
  }).observe(ctaFinal);
}
