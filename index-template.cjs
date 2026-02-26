const path = require('node:path');
const { writeFileSync, readFileSync } = require('node:fs');
const { execSync } = require('node:child_process');

function indexTemplate(fileEntries) {
 const entries = Array.isArray(fileEntries) ? fileEntries : [];
 const filePaths = entries
  .map((entry) => (typeof entry === 'string' ? entry : (entry?.path ?? entry?.originalPath)))
  .filter(Boolean);

 filePaths.sort((a, b) =>
  path.basename(a, path.extname(a)).localeCompare(path.basename(b, path.extname(b))),
 );

 const fileNames = filePaths.map((filePath) => path.basename(filePath, path.extname(filePath)));

 const packageExports = fileNames.reduce(
  (acc, fileName) => {
   acc[`./${fileName}`] = {
    import: {
     types: `./dist/types/esm/icons/${fileName}.d.ts`,
     import: `./dist/lib/icons/${fileName}.js`,
    },
    require: {
     types: `./dist/types/cjs/icons/${fileName}.d.cts`,
     require: `./dist/lib/icons/${fileName}.cjs`,
    },
   };
   return acc;
  },
  {
   '.': {
    import: {
     types: `./dist/types/esm/icons/index.d.ts`,
     import: `./dist/lib/icons/index.js`,
    },
    require: {
     types: `./dist/types/cjs/icons/index.d.cts`,
     require: `./dist/lib/icons/index.cjs`,
    },
   },
  },
 );

 const packageJson = readFileSync('package.json', 'utf8');
 const packageJsonObject = JSON.parse(packageJson);
 packageJsonObject.exports = packageExports;
 writeFileSync('package.json', JSON.stringify(packageJsonObject, null, 2));
 execSync('npm run lint:fix -- package.json');

 const exportLines = filePaths.map((filePath) => {
  const basename = path.basename(filePath, path.extname(filePath));
  const exportName = /^\d/.test(basename) ? `Icon${basename}` : basename;
  return `export { default as ${exportName} } from './${basename}.js'`;
 });

 return `export type { IconSize, IconStrokeWidth } from '../icon-config.js';\n${exportLines.join('\n')}`;
}

module.exports = indexTemplate;
