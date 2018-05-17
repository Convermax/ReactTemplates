'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    function onClick1() {
        {
            console.log('some work a1');
        }
    }
    function onClick2() {
        {
            console.log('some work a2');
        }
    }
    function repeatSize3(size, sizeIndex) {
        return React.createElement('span', {}, 'repeat');
    }
    function onClick4() {
        {
            console.log('some work c1');
        }
    }
    function onClick5() {
        {
            console.log('some work c2');
        }
    }
    return React.createElement('div', {}, a ? React.createElement('div', {
        'className': 'cmTemplate_a',
        'key': '8'
    }, React.createElement('div', {}, React.createElement('button', { 'onClick': onClick1.bind(this) }), React.createElement('button', { 'onClick': onClick2.bind(this) }))) : null, b ? React.createElement('div', {
        'className': 'cmTemplate_b',
        'key': '207'
    }, React.createElement.apply(this, [
        'div',
        {},
        _map([
            1,
            2,
            3
        ], repeatSize3.bind(this))
    ])) : null, c ? React.createElement('div', {
        'className': 'cmTemplate_c',
        'key': '316'
    }, React.createElement('div', {}, React.createElement('button', { 'onClick': onClick4.bind(this) }), React.createElement('button', { 'onClick': onClick5.bind(this) }))) : null, d ? React.createElement('div', {
        'className': 'cmTemplate_c',
        'key': '513'
    }, React.createElement('div', {}, '\n  empty\n')) : null);
};