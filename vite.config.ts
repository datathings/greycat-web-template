import { defineConfig } from 'vite-plus';
import greycat from '@greycat/web/vite-plugin';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    options: { typeAware: true, typeCheck: true },
  },
  fmt: { singleQuote: true },
  plugins: [greycat()],
});
