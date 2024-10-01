import { babel } from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';
import svgo from 'rollup-plugin-svgo';
import { terser } from 'rollup-plugin-terser';

const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.esm.js',
    format: 'esm',
  },
  external: [/@babel\/runtime/, 'react'],
  plugins: [
    babel({ babelHelpers: 'runtime', plugins: ['@babel/plugin-transform-runtime'] }),
    filesize(),
    svgo({
      plugins: [
        { name: 'removeViewBox', active: false },
        { name: 'removeDimensions', active: true },
        { name: 'removeTitle', active: true },
        { name: 'removeComments', active: true },
        { name: 'removeMetadata', active: true },
        { name: 'removeDesc', active: true },
        { name: 'removeUselessDefs', active: true },
        { name: 'removeEditorsNSData', active: true },
        { name: 'removeEmptyAttrs', active: true },
        { name: 'removeHiddenElems', active: true },
        { name: 'removeEmptyText', active: true },
        { name: 'removeEmptyContainers', active: true },
        { name: 'removeUnknownsAndDefaults', active: true },
        { name: 'removeNonInheritableGroupAttrs', active: true },
        { name: 'removeUselessStrokeAndFill', active: true },
        { name: 'removeUnusedNS', active: true },
        { name: 'cleanupIDs', active: true },
        { name: 'cleanupNumericValues', active: true },
        { name: 'moveElemsAttrsToGroup', active: true },
        { name: 'moveGroupAttrsToElems', active: true },
        { name: 'collapseGroups', active: true },
        { name: 'mergePaths', active: true },
        { name: 'convertShapeToPath', active: true },
        { name: 'sortAttrs', active: true },
        { name: 'removeDuplicateAttrs', active: true },
      ],
    }),
    terser(),
  ],
};

export default config;
