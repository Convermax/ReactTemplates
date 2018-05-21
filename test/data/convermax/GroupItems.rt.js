'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    function repeatGroupItemsBy1(GroupItemsBy, GroupItemsByIndex) {
        return [GroupItemsBy(function () {
                function repeatGroup1(Group, GroupIndex) {
                    return [Group(function () {
                            return React.createElement('div', { 'className': 'item-class' }, 'Item');
                        }, { count: undefined })];
                }
                return React.createElement.apply(this, [
                    'div',
                    { 'className': 'repeaterGroup-class cmRepeater_Group' },
                    _map(this.Group, repeatGroup1.bind(this))
                ]);
            }, { count: 3 })];
    }
    return React.createElement('div', {}, React.createElement.apply(this, [
        React.Fragment,
        {},
        _map(this.GroupItemsBy, repeatGroupItemsBy1.bind(this))
    ]));
};