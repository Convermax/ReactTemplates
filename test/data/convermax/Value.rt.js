'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    return React.createElement('div', {}, '\n    ', this.FacetsPanel(function () {
        function repeatFacets1(Facets, FacetsIndex) {
            return [Facets(function () {
                    return this.template === 'ColorFacet' ? React.createElement('div', { 'className': 'cmTemplate_ColorFacet' }, '\n              colorFacet\n                ', this.ColorSlider(function () {
                        return React.createElement('div', { 'className': 'cm_ColorSlider' }, '\n                  colorSlider\n                ');
                    }, {
                        widgetName: 'undefined',
                        items: undefined
                    }), '\n          ') : React.createElement('div', { 'className': 'cmTemplate_Unknow' }, JSON.stringify(this));
                }, { count: undefined })];
        }
        return React.createElement('div', { 'className': 'cm_FacetsPanel' }, React.createElement.apply(this, [
            'ul',
            { 'className': 'list-group cmRepeater_Facets' },
            _map(this.Facets, repeatFacets1.bind(this))
        ]));
    }, {
        widgetName: 'undefined',
        items: undefined
    }), '\n');
};