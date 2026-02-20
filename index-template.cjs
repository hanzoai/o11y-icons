const path = require("path");

/**
 * SVGR index template: generates src/index.ts with named exports.
 * Component names starting with a number get an "Icon" prefix (e.g. 42.svg -> Icon42).
 */
function indexTemplate(filePaths) {
  const exportEntries = filePaths
    .filter((entry) => entry && (entry.path != null || entry.originalPath != null))
    .map((entry) => {
      const filePath = entry.path ?? entry.originalPath;
      const basename = path.basename(filePath, path.extname(filePath));
      const exportName = /^\d/.test(basename) ? `Icon${basename}` : basename;
      return `export { default as ${exportName} } from './${basename}'`;
    });
  return exportEntries.join("\n");
}

module.exports = indexTemplate;
