'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    return React.createElement('div', {}, '\n    ', this.SearchHeader(function () {
        return React.createElement('li', {
            'id': 'searchHeader',
            'className': 'cm_class cm_SearchHeader'
        });
    }, { widgetName: 'searchHeader' }), '\n');
};