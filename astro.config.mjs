// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), svelte({ extensions: ['.svelte'] })],
  env: {
    schema: {
      BACK_END_URL: envField.string({ default: "http://localhost:1337", context: 'client', access: 'public'})
    }
  },
  adapter: vercel()
});