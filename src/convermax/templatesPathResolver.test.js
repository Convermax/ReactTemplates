const path = require('path');
const fs = require('fs');
const TemplatesPathResolver = require('./templatesPathResolver');

const rootPath = __dirname;
const templatesRoot = 'test';

const resolver = new TemplatesPathResolver(rootPath, templatesRoot);

const originalExistsSync = fs.existsSync;
const existsSync = jest.fn();
beforeAll(() => {
  fs.existsSync = existsSync;
});
afterAll(() => {
  fs.existsSync = originalExistsSync;
});

const basicCases = [
  ['take default if no custom', false, './templates/default'],
  ['take custom if found', true, `./templates/${templatesRoot}/Templates`],
];

const names = [
  ['root files', 'SearchBox'],
  ['deep files', 'LeftPanel/FacetsPanel'],
  ['file with dashes in the name', 'icons/arrow-down'],
];

describe.each(basicCases)('%s', (_name, fileFound, root) => {
  beforeAll(() => {
    existsSync.mockReturnValue(fileFound);
  });

  afterAll(() => {
    existsSync.mockReset();
  });

  test.each(names)('%s', (_name, file) => {
    const actual = resolver.resolve(`template="${file}"`);
    const expected = `template="${resolveFromRoot(`${root}/${file}.rt`)}"`;
    expect(actual).toBe(expected);
  });
});

describe('default template explicitly requested', () => {
  test.each(names)('%s', (_name, file) => {
    const actual = resolver.resolve(`template="default/${file}"`);
    const expected = `template="${resolveFromRoot(`./templates/default/${file}.rt`)}"`;
    expect(actual).toBe(expected);
  });
});

function resolveFromRoot(...paths) {
  // backslashes must be escaped or they will escape another characters
  return path.resolve(rootPath, ...paths).replace(/\\/g, '\\\\');
}
