'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    function repeatValues1(Values, ValuesIndex) {
        return [Values(function () {
                return React.createElement('div', {
                    'className': 'facet-value ' + (this.isSelected ? 'selected' : ''),
                    'key': this.Term
                }, React.createElement('div', { 'className': 'facet-value-chbox' }, this.checkbox), React.createElement('div', { 'className': 'facet-value-text' }, React.createElement('a', {}, this.Value, ' ', React.createElement('span', { 'className': 'hits' }, '(', this.HitCount, ')')), React.createElement('div', { 'className': 'clearfix' })), React.createElement('div', { 'className': 'clearfix' }));
            }, { count: undefined })];
    }
    return React.createElement('div', {
        'className': 'module',
        'key': this.FieldName
    }, React.createElement('h3', {
        'className': 'menu-headers facet-title expanded',
        'data-cm-role': 'collaps-facet'
    }, this.DisplayName), this.template === 'SimpleFacet' ? React.createElement('div', {
        'className': 'cmTemplate_SimpleFacet',
        'key': '154'
    }, React.createElement.apply(this, [
        'div',
        { 'className': 'cmRepeater_Values' },
        _map(this.Values, repeatValues1.bind(this))
    ]), '\r\n      ', this.ShowAll(function () {
        return React.createElement('div', { 'className': 'cm_ShowAll' }, !this.open ? React.createElement('a', {
            'className': 'expandswitcher collapsed',
            'key': '35'
        }, 'Show more ', React.createElement('i', { 'className': 'icon-down-open' })) : null, this.open ? React.createElement('a', {
            'className': 'expandswitcher expanded',
            'key': '145'
        }, 'Show less ', React.createElement('i', { 'className': 'icon-up-open' })) : null);
    }, { widgetName: 'undefined' }), '\r\n    ') : null, this.template === 'ComboBoxRangedFacet' ? React.createElement('div', {
        'className': 'cmTemplate_ComboBoxRangedFacet',
        'key': '1355'
    }, React.createElement('div', { 'className': 'ranged-facet-input-wrap' }, React.createElement('input', {
        'type': 'text',
        'data-cm-role': 'input-min',
        'value': this.inputMin,
        'placeholder': 'Min price',
        'className': 'ranged-facet-input min'
    }), React.createElement('span', {}, '\u2014'), React.createElement('input', {
        'type': 'text',
        'data-cm-role': 'input-max',
        'value': this.inputMax,
        'placeholder': 'Max price',
        'className': 'ranged-facet-input max'
    }), React.createElement('div', { 'className': 'clearfix' })), React.createElement('button', {
        'type': 'button',
        'data-cm-role': 'add-facet',
        'className': 'btn'
    }, 'apply')) : null);
};