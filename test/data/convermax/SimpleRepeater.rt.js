'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    function repeatRepeater1(Repeater, RepeaterIndex) {
        return [Repeater(function () {
                return React.createElement('div', {}, 'Repeate');
            }, { count: undefined })];
    }
    return React.createElement('div', {}, React.createElement.apply(this, [
        'div',
        { 'className': 'cmRepeater_Repeater' },
        _map(this.Repeater, repeatRepeater1.bind(this))
    ]));
};