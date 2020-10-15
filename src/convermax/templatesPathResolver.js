const fs = require('fs');
const path = require('path');

class TemplatesPathResolver {
  constructor(rootPath, templatesRoot) {
    this.pathToDefault = path.resolve(rootPath, './templates/default');
    this.pathToCustom = path.resolve(rootPath, `./templates/${templatesRoot}/Templates`);
  }

  resolve(source) {
    return source.replace(
      /template="([\w/-]+)"/g,
      (match, aliasPath) => match.replace(aliasPath, this.resolveAlias(aliasPath))
    );
  }

  resolveAlias(aliasPath) {
    if (aliasPath.startsWith('default/')) {
      return fromRoot(aliasPath.replace('default/', ''), this.pathToDefault);
    }
    const possibleCustomFile = fromRoot(aliasPath, this.pathToCustom);
    if (fs.existsSync(possibleCustomFile)) {
      return possibleCustomFile;
    }
    return fromRoot(aliasPath, this.pathToDefault);
  }
}

function fromRoot(aliasPath, root) {
  return path.resolve(root, `./${aliasPath}.rt`).replace(/\\/g, '\\\\');
}

module.exports = TemplatesPathResolver;
