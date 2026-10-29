import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://lucidsec.uz',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'uz'],
    routing: { prefixDefaultLocale: false },
  },
});
