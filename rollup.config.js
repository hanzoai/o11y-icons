import { babel } from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';
import svgo from 'rollup-plugin-svgo';

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
        { removeTitle: true },
        { removeComments: true },
      ],
    }),
  ],
};

export default config;
