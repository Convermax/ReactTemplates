const fs = require('fs');
const path = require('path');

class TemplatesReplacementsHandler {
  constructor(rootPath, templatesRoot) {
    const defaultReplacementsPath = path.resolve(rootPath, 'templates/default/replacements.js');
    const defaultReplacements = require(defaultReplacementsPath);

    const clientReplacementsPath = path.resolve(rootPath, `templates/${templatesRoot}/replacements.js`);
    const clientReplacements = fs.existsSync(clientReplacementsPath) ? require(clientReplacementsPath) : {};

    this.replacements = { ...defaultReplacements, ...clientReplacements };
  }

  replace(source) {
    return Object.entries(this.replacements).reduce(
      (result, [placeholder, value]) => (
        !value && placeholder.endsWith('_CLASS') ?
          result.replace(new RegExp(`class="${placeholder}" ?|\\b${placeholder}\\b`, 'g'), '') :
          result.replace(new RegExp(`\\b${placeholder}\\b`, 'g'), value)
      ),
      source
    );
  }
}

module.exports = TemplatesReplacementsHandler;
