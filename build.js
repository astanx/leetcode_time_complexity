import esbuild from 'esbuild';
import sveltePlugin from 'esbuild-svelte';
import {sveltePreprocess} from 'svelte-preprocess';
import fs from 'fs-extra';

const DIST = 'dist';

// Clear dist and copy public
await fs.remove(DIST);
await fs.copy('public', DIST);
await fs.copyFile('manifest.json', `${DIST}/manifest.json`);

console.log('📦 Starting build...');

await Promise.all([
  // Build popup
  esbuild.build({
    entryPoints: ['src/popup/main.ts'],
    bundle: true,
    outfile: `${DIST}/popup.js`,
    format: 'esm',
    plugins: [
      sveltePlugin({
        preprocess: sveltePreprocess(),
      }),
    ],
    sourcemap: true,
    minify: false,
    target: 'es2022'
  }),

  // Build background
  esbuild.build({
    entryPoints: ['src/background.ts'],
    bundle: true,
    outfile: `${DIST}/background.js`,
    format: 'esm',
    sourcemap: true,
    target: 'es2022'
  }),

  // Build content 
  esbuild.build({
    entryPoints: ['src/content.ts'],
    bundle: true,
    outfile: `${DIST}/content.js`,
    format: 'esm',
    sourcemap: true,
    target: 'es2022'
  })
]);

console.log('✅ Build complete');
