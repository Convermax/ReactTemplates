'use strict'
const ConvermaxTemplates = require('../../src/reactTemplates').ConvermaxTemplates
const testUtils = require('./utils/testUtils')
const readFileNormalized = testUtils.readFileNormalized
const path = require('path')
const fsUtil = require('../../src/fsUtil')
const fs = require('fs')
const assert = require('assert')

const files = [
    'Component.rt',
    'DashAtName.rt',
    'Fragment.rt',
    'FunctionCurlyBraket.rt',
    'InnerHtml.rt',
    'Repeat.rt',
    'RepeaterWithScope.rt',
    'Value.rt',
    'SimpleRepeater.rt',
    'Template.rt',
    'SearchBox.rt',
    'NamingRepeater.rt'
]

describe('cm_test', () => {
    describe('#comvermax tests', () => {
        it('should convert text successfully', () => {
            const dataPath = path.resolve(__dirname, '..', 'data/convermax')
            files.forEach(testFile => {
                const filename = path.join(dataPath, testFile)
                const options = {
                    readFileSync: fsUtil.createRelativeReadFileSync(filename),
                    modules: 'commonjs',
                    defines: [{moduleName: 'react', alias: 'React', member: '*'},
                        {moduleName: 'lodash-es/map', alias: '_map', member: 'default'}]
                }
                let equal = false
                let actual = ''
                //let equal = false
                try {
                    const html = fs.readFileSync(filename).toString()
                    const convermaxTemplate = new ConvermaxTemplates({
                        resourcePath: `${dataPath}/${testFile}`,
                        addDependency(dep) {console.log(dep)}
                    }, html, options)

                    actual = convermaxTemplate.getReactTemplate()
                    const expected = readFileNormalized(`${filename}.js`)
                    //const expected = testUtils.normalizeHtml(readFileNormalized(`${filename}.html`))
                    //equal = assert.equal(actual, expected, `${testFile}`)
                    //fs.writeFileSync(`${filename}.js`, code)

                    equal = assert.equal(actual, expected, `${testFile}`)
                } catch (e) {
                    console.log(testFile, e)
                    fs.writeFileSync(`${filename}.actual.js`, actual)
                    assert.fail(e)
                }
            })
        })
    })
})
