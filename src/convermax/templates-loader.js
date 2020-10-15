const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');

const ConvermaxTemplates = require('./convermaxTemplates');

const TemplatesPathResolver = require('./templatesPathResolver');
const TemplatesReplacementsHandler = require('./templatesReplacementsHandler');

const cache = {};

module.exports = function(source) {

  const options = loaderUtils.getOptions(this);

  const { rootPath, templatesRoot } = options;

  const {
    templatesPathResolver = new TemplatesPathResolver(rootPath, templatesRoot),
    templatesReplacementsHandler = new TemplatesReplacementsHandler(rootPath, templatesRoot),
  } = cache;

  source = templatesReplacementsHandler.replace(source); // TODO: move this into ConvermaxTemplates class
  source = templatesPathResolver.resolve(source); // TODO: move this into ConvermaxTemplates class

  options.readFileSync = fileName => {
    // console.log('*****************' + fileName + '******************');
    const filePath = path.resolve(path.dirname(this.resourcePath), fileName);
    this.addDependency(filePath);

    let fileContent = fs.readFileSync(filePath).toString('utf8');
    fileContent = templatesReplacementsHandler.replace(fileContent);
    fileContent = templatesPathResolver.resolve(fileContent);
    return fileContent;
  };

  this.cacheable && this.cacheable();
  // console.log(this.resourcePath)
  const reactTemplatesLoaderCustom = new ConvermaxTemplates(this, source, options);

  const templateJs = reactTemplatesLoaderCustom.getReactTemplate();

  return templateJs;
};
