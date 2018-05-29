'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    function scopeIsMobile1() {
        var isMobile = this.isMobile;
        return React.createElement('main', {}, [this.SearchResult(function () {
                function repeatItems1(Items, ItemsIndex) {
                    return [Items(function () {
                            return React.createElement('li', {}, React.createElement('a', { 'data-original-title': '<p>Free</p>' }, 'Free Shipping'));
                        }, { count: undefined })];
                }
                return React.createElement('div', { 'className': 'cm_SearchResult' }, [this.Loading(function () {
                        return React.createElement('div', { 'className': 'cm_Loading' }, React.createElement('div', {}, [this.SearchHeader(function () {
                                return React.createElement('li', {
                                    'id': 'searchHeader',
                                    'className': 'cm_class cm_SearchHeader'
                                });
                            }, {
                                widgetName: 'searchHeader',
                                items: [
                                    1,
                                    2,
                                    3
                                ]
                            })]));
                    }, {
                        widgetName: 'undefined',
                        items: undefined
                    })], this.TotalHits > 0 ? React.createElement('ul', {
                    'className': 'products',
                    'key': '518'
                }, React.createElement.apply(this, [
                    'div',
                    { 'className': 'cmRepeater_Items' },
                    _map(this.Items, repeatItems1.bind(this))
                ])) : null);
            }, {
                widgetName: 'undefined',
                items: undefined
            })]);
    }
    return scopeIsMobile1.apply(this, []);
};