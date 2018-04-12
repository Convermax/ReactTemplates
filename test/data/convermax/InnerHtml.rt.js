'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    return React.createElement('div', {}, React.createElement('span', { dangerouslySetInnerHTML: { __html: this.TextHighlight } }));
};