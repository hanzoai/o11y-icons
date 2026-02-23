const path = require('node:path');

function indexTemplate(fileEntries) {
 const entries = Array.isArray(fileEntries) ? fileEntries : [];
 const filePaths = entries
  .map((entry) => (typeof entry === 'string' ? entry : (entry?.path ?? entry?.originalPath)))
  .filter(Boolean);

 filePaths.sort((a, b) =>
  path.basename(a, path.extname(a)).localeCompare(path.basename(b, path.extname(b))),
 );

 const exportLines = filePaths.map((filePath) => {
  const basename = path.basename(filePath, path.extname(filePath));
  const exportName = /^\d/.test(basename) ? `Icon${basename}` : basename;
  return `export { default as ${exportName} } from './${basename}'`;
 });

 return `export type { IconSize, IconStrokeWidth } from '../lib/icon-config';\n${exportLines.join('\n')}`;
}

module.exports = indexTemplate;
