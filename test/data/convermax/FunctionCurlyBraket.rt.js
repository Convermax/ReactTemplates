'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    function repeatRootRepeater1(RootRepeater, RootRepeaterIndex) {
        return [RootRepeater(function () {
                function repeatGroup1(Group, GroupIndex) {
                    return [Group(function () {
                            function onClick1_Items() {
                                addToMySelection('3', {
                                    Name: 'PatternColorID',
                                    Value: this.ItemNumber
                                });
                            }
                            return this.template === 'Items' ? React.createElement('div', { 'className': 'cmTemplate_Items' }, React.createElement('div', { 'className': 'col grid_6of12' }, React.createElement('span', {
                                'id': this.ItemNumber,
                                'onClick': onClick1_Items.bind(this),
                                'className': 'myselection'
                            }))) : React.createElement('div', { 'className': 'cmTemplate_Unknow' }, JSON.stringify(this));
                        }, { count: undefined })];
                }
                return React.createElement.apply(this, [
                    'div',
                    { 'className': 'cmRepeater_Group' },
                    _map(this.Group, repeatGroup1.bind(this))
                ]);
            }, { count: undefined })];
    }
    return React.createElement('div', {}, React.createElement.apply(this, [
        'div',
        { 'className': 'cmRepeater_RootRepeater' },
        _map(this.RootRepeater, repeatRootRepeater1.bind(this))
    ]));
};