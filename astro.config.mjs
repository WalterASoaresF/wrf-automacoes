// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Endereço do site e subpasta. Padrão: Cloudflare Pages na raiz (CLAUDE.md, seção 2).
// A prévia no GitHub Pages fica numa subpasta (usuario.github.io/wrf-automacoes/), então o
// workflow em .github/workflows/ passa SITE_URL e BASE_PATH no build.
// Trocar SITE_URL padrão pelo domínio próprio quando wrfautomacoes.com.br for registrado.
const site = process.env.SITE_URL || 'https://wrf-automacoes.pages.dev';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    // CSS pequeno vai inline no <head>: uma requisição a menos no carregamento.
    inlineStylesheets: 'auto',
  },
});
