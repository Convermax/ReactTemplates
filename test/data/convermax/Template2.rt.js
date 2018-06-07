'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    return React.createElement('div', { 'className': 'cm_Dialog-background' }, 'v\n    ', this.name === 'MobileFacets' ? React.createElement(React.Fragment, { 'key': '40' }, [this.FilterChips(function () {
            return React.createElement('div', { 'className': 'cm_FilterChips' }, React.createElement('div', {}, '\n  empty\n'));
        }, {
            widgetName: 'undefined',
            items: undefined
        })], [this.FacetsPanelMobile(function () {
            return this.Facets.length > 0 ? React.createElement('div', {
                'className': 'cm_FacetsPanelMobile',
                'key': '0'
            }, React.createElement('div', {}, '\n  empty\n')) : null;
        }, {
            widgetName: 'undefined',
            items: undefined
        })]) : null);
};