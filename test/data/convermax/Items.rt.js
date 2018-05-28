'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    function repeatItems1(Items, ItemsIndex) {
        return [Items(function () {
                return React.createElement('a', { 'data-original-title': '<p>Free</p>' }, 'Free Shipping');
            }, { count: undefined })];
    }
    return React.createElement('div', {}, React.createElement.apply(this, [
        'div',
        { 'className': 'cmRepeater_Items' },
        _map(this.Items, repeatItems1.bind(this))
    ]));
};