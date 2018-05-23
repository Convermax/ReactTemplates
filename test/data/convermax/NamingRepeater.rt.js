'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    function repeatRepeater1(Repeater, RepeaterIndex) {
        return [Repeater(function () {
                function repeatValues1_e(Values, ValuesIndex) {
                    return [Values(function () {
                            function onClick1_a() {
                                {
                                    console.log('some work a1');
                                }
                            }
                            function onClick2_a() {
                                {
                                    console.log('some work a2');
                                }
                            }
                            function repeatSize1_b(size, sizeIndex) {
                                return React.createElement('span', {}, 'repeat');
                            }
                            function onClick1_c() {
                                {
                                    console.log('some work c1');
                                }
                            }
                            function onClick2_c() {
                                {
                                    console.log('some work c2');
                                }
                            }
                            return this.template === 'a' ? React.createElement('div', { 'className': 'cmTemplate_a' }, React.createElement('div', {}, React.createElement('button', { 'onClick': onClick1_a.bind(this) }), React.createElement('button', { 'onClick': onClick2_a.bind(this) }))) : this.template === 'b' ? React.createElement('div', { 'className': 'cmTemplate_b' }, React.createElement.apply(this, [
                                'div',
                                {},
                                _map([
                                    1,
                                    2,
                                    3
                                ], repeatSize1_b.bind(this))
                            ])) : this.template === 'c' ? React.createElement('div', { 'className': 'cmTemplate_c' }, React.createElement('div', {}, React.createElement('button', { 'onClick': onClick1_c.bind(this) }), React.createElement('button', { 'onClick': onClick2_c.bind(this) }))) : this.template === 'd' ? React.createElement('div', { 'className': 'cmTemplate_d' }, React.createElement('div', {}, '\n  empty\n')) : React.createElement('div', { 'className': 'cmTemplate_Unknow' }, JSON.stringify(this));
                        }, { count: undefined })];
                }
                return this.template === 'e' ? React.createElement('div', { 'className': 'cmTemplate_e' }, React.createElement('div', {}, React.createElement.apply(this, [
                    'div',
                    { 'className': 'cmRepeater_Values' },
                    _map(this.Values, repeatValues1_e.bind(this))
                ]))) : React.createElement('div', { 'className': 'cmTemplate_Unknow' }, JSON.stringify(this));
            }, { count: undefined })];
    }
    return React.createElement('div', {}, React.createElement.apply(this, [
        'div',
        { 'className': 'cmRepeater_Repeater' },
        _map(this.Repeater, repeatRepeater1.bind(this))
    ]));
};