'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    function repeatFacets1(Facets, FacetsIndex) {
        return [Facets(function () {
                function repeatValue1_ModelDash(value, valueIndex) {
                    return React.createElement('span', {}, value);
                }
                return this.template === 'Model-Dash' ? React.createElement.apply(this, [
                    'div',
                    { 'className': 'cmTemplate_Model-Dash' },
                    _map([
                        1,
                        2,
                        3
                    ], repeatValue1_ModelDash.bind(this))
                ]) : React.createElement('div', { 'className': 'cmTemplate_Unknow' }, JSON.stringify(this));
            }, { count: undefined })];
    }
    return React.createElement('div', {}, React.createElement.apply(this, [
        'div',
        { 'className': 'cmRepeater_Facets' },
        _map(this.Facets, repeatFacets1.bind(this))
    ]));
};