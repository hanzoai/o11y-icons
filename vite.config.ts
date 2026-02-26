import path from 'node:path';
import react from '@vitejs/plugin-react';
import fs from 'fs-extra';
import { glob } from 'glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const iconFiles = glob.sync('lib/icons/**/*.tsx', { cwd: __dirname });

export default defineConfig({
 plugins: [
  react({ jsxRuntime: 'automatic' }),
  dts({
   tsconfigPath: './tsconfig.json',
   entryRoot: 'lib',
   // create two type folders, one for esm and cjs
   outDir: ['dist/types/esm', 'dist/types/cjs'],
   // modify type files after they have been written
   afterBuild: async () => {
    // Fetch all .d.ts files recursively from the dist/types/cjs directory
    const files = glob.sync('dist/types/cjs/**/*.d.{ts,ts.map}', { nodir: true });
    // Since TypeScript 5.0, it has emphasized that type files (*.d.ts) are also affected by its ESM and CJS context.
    // This means that you can't share a single type file for both ESM and CJS exports of your library.
    // You need to have two type files when dual-publishing your library.
    // see https://www.typescriptlang.org/docs/handbook/modules/reference.html#node16-nodenext and
    // https://publint.dev/rules#export_types_invalid_format
    await Promise.all(
     // Ideally, this plugin will support different types in the future
     // See https://github.com/qmhc/vite-plugin-dts/issues/267
     files.map(async (file: string): Promise<void> => {
      // Generate the new files with the new .c.ts/.c.ts.map naming
      const newFilePath = file.replace(/\.d\.ts(\.map)?$/, '.d.cts$1');
      await fs.move(file, newFilePath, { overwrite: true });

      // Update sourceMappingURL references
      if (newFilePath.endsWith('.d.cts')) {
       const content = await fs.readFile(newFilePath, 'utf-8');
       let updatedContent = content.replace(/\/\/# sourceMappingURL=.*\.d\.ts\.map/g, (match) =>
        match.replace('.d.ts.map', '.d.cts.map'),
       );
       // Update .js references to .cjs
       updatedContent = updatedContent.replace(/(from\s+['"].*?)\.jsx(['"])/g, '$1.cjs$2');
       updatedContent = updatedContent.replace(/(from\s+['"].*?)\.js(['"])/g, '$1.cjs$2');
       await fs.writeFile(newFilePath, updatedContent, 'utf-8');
      }

      // Update source map file references
      if (newFilePath.endsWith('.d.cts.map')) {
       const content = await fs.readJson(newFilePath);
       content.file = content.file.replace('.d.ts', '.d.cts');
       await fs.writeJson(newFilePath, content);
      }
     }),
    );
   },
  }),
 ],
 build: {
  lib: {
   entry: ['lib/icons/index.ts', ...iconFiles],
   formats: ['es', 'cjs'],
   fileName: (format) => (format === 'es' ? '[name].js' : '[name].cjs'),
  },
  outDir: 'dist',
  sourcemap: true,
  rollupOptions: {
   external: ['react', 'react/jsx-runtime'],
   output: {
    preserveModules: true,
    preserveModulesRoot: path.resolve(__dirname),
    globals: {},
   },
  },
  target: 'es2018',
 },
});
