'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    function onClick1(template) {
        {
            console.log('some work a1');
        }
    }
    function onClick2(template) {
        {
            console.log('some work a2');
        }
    }
    function scopeTemplate3() {
        var template = item;
        return React.createElement('div', {}, React.createElement('button', { 'onClick': onClick1.bind(this, template) }), React.createElement('button', { 'onClick': onClick2.bind(this, template) }), React.createElement('div', { 'className': 'fltr clearall priceval' }, '\n      ', (() => {
            return 'inline text from js';
        })(), '\n    '));
    }
    return scopeTemplate3.apply(this, []);
};