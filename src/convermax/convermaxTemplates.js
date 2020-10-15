'use strict'

const cheerio = require('cheerio')
const esprima = require('esprima')
const escodegen = require('escodegen')
const path = require('path')
const htmlEntities = require('html-entities').Html5Entities

const RT = require('../reactTemplates')

const cm = nodeName => nodeName?.startsWith('cm:')
const cmTemplate = nodeName => nodeName?.startsWith('cmTemplate:')
const cmRepeater = nodeName => nodeName?.startsWith('cmRepeater:')

const cheerioConf = { // TODO: should it be synced with reactTemplates.parseAndConvertHtmlToReact ?
    lowerCaseTags: false,
    lowerCaseAttributeNames: false,
    xmlMode: true,
    withStartIndices: true
    //decodeEntities: false
}

function replaceDoubleBrackets(source) {
    return source.replace(/{{[^}]+}}/g, str => `{this.${str.slice(2, -2).trim()}}`)
}

function replaceColon(source) {
    return source.replace(/\:/g, '_')
}

const getTagName = wrapper => wrapper == null ? 'div' : wrapper
const getWidgetName = widgetName => widgetName === '' ? undefined : widgetName
const getCount = count => count === '' ? 'undefined' : count

class ConvermaxTemplates {
    constructor(context, source, options) {
        this.source = source
        this.context = context
        this.options = options
        this.repeaterContext = []

        this.$ = cheerio.load(replaceDoubleBrackets(source), cheerioConf)
        this.$('[template]').each((index, element) => this.templateProcessCheerio(element, context.resourcePath))
        this.$('[inner-html]').each((index, element) => {
            const el = cheerio(element)
            const value = el.attr('inner-html')
            el.removeAttr('inner-html')
            el.attr('rt-props', `{ dangerouslySetInnerHTML: {__html: ${value}}}`)
        })

        try {
            this.wrapProcess(this.findComponents(this.$.root()[0]))
        } catch (e) {
            throw e
        }
    }

    findComponents($element) {
        const childNodes = $element.children
        const components = []
        if (childNodes.length === 0) {
            return components
        }

        /* eslint-disable no-restricted-syntax */
        for (let i = 0; i < childNodes.length; i++) {
            if (childNodes[i].children != null && childNodes[i].children.length > 0) {
                components.push(...this.findComponents(childNodes[i]))
            }
            if (childNodes[i].name != null &&
                cm(childNodes[i].name) ||
                cmTemplate(childNodes[i].name) ||
                cmRepeater(childNodes[i].name)) {
                components.push(childNodes[i])
            }
        }
        /* eslint-enable no-restricted-syntax */
        return components
    }

    wrapProcess(components) {
        components.forEach(component => {
            const $component = this.$(component)

            if (cm(component.name)) {
                $component.replaceWith(this.simpleComponent($component))
            }
            if (cmTemplate(component.name)) {
                if (cmRepeater(component.parent.name)) {
                    this.repeaterContext.push(this.functionTemplate($component))
                } else {
                    $component.replaceWith(this.rtIfTemplate($component))
                }
            }
            if (cmRepeater(component.name)) {
                if (this.repeaterContext.length === 0) {
                    $component.replaceWith(this.repeaterComponent($component))
                } else {
                    $component.replaceWith(this.repeaterComponent($component,
                        `function(){ ${[...this.repeaterContext].map(v => v.scope).join('')} return ${[...this.repeaterContext, {condition: 'React.createElement("div", {"className": "cmTemplate_Unknow"}, JSON.stringify(this))'}]
                            .map(v => v.condition).join(':')}}`))

                    this.repeaterContext = []
                }
            }
        })
    }

    templateProcessCheerio(element, resourcePath) {
        const el = this.$(element)
        const templatePath = path.resolve(path.dirname(resourcePath), el.attr('template'))
        el.removeAttr('template')
        const source = this.options.readFileSync(templatePath).toString('utf8')
        const file = cheerio.load(replaceDoubleBrackets(source), cheerioConf)
        file('[template]').each((index, templateElement) => this.templateProcessCheerio(templateElement, templatePath))
        el.empty().append(file.html(), cheerioConf)
    }

    getReactTemplate() {
        let parsed
        try {
            parsed = RT.convertTemplateToReact(this.$.html(), this.options)
            parsed = parsed.replace(/_\.map/g, '_map')
            parsed = parsed.replace(/_\.assign/g, 'Object.assign')
            parsed = htmlEntities.decode(parsed)
        } catch (e) {
            throw e
        }

        return parsed
    }

    simpleComponent($node) {
        const newTagName = getTagName($node.attr('wrapper'))
        const widgetName = getWidgetName($node.attr('widget-name'))
        const items = getWidgetName($node.attr('cm-items'))
        const slicedName = $node.get(0).tagName.slice(3)

        const localRoot = cheerio.load(`<${newTagName}>${$node.html()}</${newTagName}>`, cheerioConf)
        const newNode = localRoot(newTagName).first()
        //const virtualRoot = cheerio.load('<rt-virtual>', cheerioConf)
        const virtual = localRoot('<rt-virtual>').first()
        $node.attr('wrapper', null)
        $node.attr('widget-name', null)
        $node.attr('cm-items', null)
        if (newTagName !== 'React.Fragment') {
            newNode.attr($node.attr())
            newNode.addClass(replaceColon($node.get(0).tagName))
        }
        const converted = RT.convertTemplateToReact(localRoot.html(), {...this.options, modules: 'jsrt'})
        virtual.text(`{this.${slicedName}(${converted},{widgetName:'${widgetName}', items:${items}})}`)

        return virtual
    }

    repeaterComponent($node, inner) {
        const newTagName = getTagName($node.attr('wrapper'))
        const count = getCount($node.attr('count'))
        $node.attr('wrapper', null)
        $node.attr('count', null)

        const slicedName = $node.get(0).tagName.slice(11)
        const localRoot = cheerio.load(`<${newTagName}><rt-virtual/></${newTagName}`, cheerioConf)
        const newNode = localRoot(newTagName).first()

        const virtual = localRoot('rt-virtual').first()
        const fragmentRoot = cheerio.load('<div>', cheerioConf)
        const fragmentNode = fragmentRoot($node)

        virtual.attr('rt-repeat', `${slicedName} in this.${slicedName}`)

        virtual.text(`{${slicedName}(${
            inner == null ? RT.convertTemplateToReact(fragmentNode.html(), {...this.options, modules: 'jsrt'}) :
                inner
        }, {count:${count}})}`)

        if (newTagName !== 'React.Fragment') {
            newNode.attr($node.attr())
            newNode.addClass(replaceColon($node.get(0).tagName))
        }
        return localRoot.html()
    }

    rtIfTemplate($node) {
        const newTagName = getTagName($node.attr('wrapper'))
        //const widgetName = getWidgetName($node.attr('widget-name'))
        const slicedName = $node.get(0).tagName.slice(11)
        const localRoot = cheerio.load(`<${newTagName}>`, cheerioConf)

        const newNode = localRoot(`<${newTagName}>`)
        newNode.append($node.html())
        const rtIfAttr = $node.attr('rt-if')
        $node.attr('wrapper', null)
        $node.attr('rt-if', null)

        newNode.attr('rt-if', rtIfAttr == null ? `this.template === '${slicedName}'` : rtIfAttr)

        if (newTagName !== 'React.Fragment') {
            newNode.attr($node.attr())
            newNode.addClass(replaceColon($node.get(0).tagName))
        }
        return newNode
    }

    parseReactTemplate(fnString, suffix) {
        const ast = esprima.parseScript(`(${fnString})`)
        let returnStatement = escodegen.generate(
            ast.body[0].expression.body.body.find(v => v.type === 'ReturnStatement').argument
        )

        const scopeArr = []

        ast.body[0].expression.body.body = ast.body[0].expression.body.body.forEach(
            v => {
                if (v.type === 'FunctionDeclaration') {
                    returnStatement = returnStatement.replace(new RegExp(v.id.name, 'g'), `${v.id.name}_${suffix}`)

                    v.id.name = `${v.id.name}_${suffix}`
                    scopeArr.push(escodegen.generate(v))
                }
            }
        )
        return {func: returnStatement, scope: scopeArr.join('\n')}
    }

    functionTemplate($node) {
        const newTagName = getTagName($node.attr('wrapper'))
        const localRoot = cheerio.load(`<${newTagName}>${$node.html()}</${newTagName}>`, cheerioConf)
        const newNode = localRoot(newTagName).first()
        const slicedName = $node.get(0).tagName.slice(11)
        const rtIfAttr = $node.attr('rt-if')

        $node.attr('wrapper', null)
        $node.attr('rt-if', null)

        const condition = rtIfAttr == null ? `(this.template === '${slicedName}')` : `(${rtIfAttr})`

        if (newTagName !== 'React.Fragment') {
            newNode.attr($node.attr())
            newNode.addClass(replaceColon($node.get(0).tagName))
        }
        const reactTemplateParse = this.parseReactTemplate(
            RT.convertTemplateToReact(localRoot.html(), {...this.options, modules: 'jsrt'}),
            slicedName.replace('-', ''))

        return {condition: `${condition}?(${reactTemplateParse.func})`, scope: reactTemplateParse.scope}
    }
}

module.exports = ConvermaxTemplates
