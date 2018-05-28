'use strict';
var React = require('react');
var _map = require('lodash-es/map').default;
module.exports = function () {
    return React.createElement('fieldset', { 'className': 'cm_SearchBox-fieldset' }, React.createElement('label', {}, React.createElement('span', { 'className': 'screen-reader-text' }, 'Search for:'), React.createElement('input', {
        'type': 'search',
        'className': 'search-field',
        'placeholder': 'Search \u2026',
        'name': 's',
        'data-cm-role': 'search-input'
    })), '\n  ', this.SearchBoxMenu(function () {
        function repeatSearchBoxMenuItem1(SearchBoxMenuItem, SearchBoxMenuItemIndex) {
            return [SearchBoxMenuItem(function () {
                    function repeatItems1(Items, ItemsIndex) {
                        return [Items(function () {
                                return this.template === 'Freetext' ? React.createElement('li', {
                                    'className': 'freetext ui-menu-item cmTemplate_Freetext',
                                    'tabIndex': '0'
                                }, React.createElement('span', { dangerouslySetInnerHTML: { __html: this.TextHighlight } })) : this.template === 'Category' ? React.createElement('li', {
                                    'className': 'cat1 ui-menu-item cmTemplate_Category',
                                    'tabIndex': '0'
                                }, React.createElement('a', {}, this.Value)) : this.template === 'Product' ? React.createElement('li', {
                                    'className': 'product products ui-menu-item cmTemplate_Product',
                                    'tabIndex': '0'
                                }, React.createElement('div', { 'className': 'imgblock' }, React.createElement('img', {
                                    'src': this.post_meta__product_attributes_product_images ? '//images.ladesignconceptsinc.com/' + this.post_meta__product_attributes_product_images[0].replace(/(_detail)?(\.jpe?g)$/, '_thumb$2') : '//images.ladesignconceptsinc.com/image-not-available_thumb.jpg',
                                    'alt': true
                                })), React.createElement('div', {}, React.createElement('a', { 'className': 'product-link product-title' }, this.post_meta__product_attributes_pattern_name ? [this.post_meta__product_attributes_pattern_name] : null, !this.post_meta__product_attributes_pattern_name && this.post_meta__product_attributes_pattern_number ? [this.post_meta__product_attributes_pattern_number] : null, !this.post_meta__product_attributes_pattern_name && !this.post_meta__product_attributes_pattern_number ? React.createElement('span', Object.assign({}, { 'key': '822' }, { dangerouslySetInnerHTML: { __html: this.post_title } })) : null), React.createElement('div', { 'className': 'product-price' }, React.createElement('div', { 'className': 'price' }, this.post_meta__sale_price ? React.createElement('del', { 'key': '1083' }, React.createElement('div', { 'className': 'woocommerce-Price-amount amount' }, React.createElement('span', { 'className': 'woocommerce-Price-currencySymbol' }, '$'), ' ', (() => {
                                    if (typeof this.post_meta__regular_price !== 'undefined') {
                                        return Number(this.post_meta__regular_price[0]).toLocaleString('en-US', { minimumFractionDigits: 2 });
                                    }
                                })(), '\n        ')) : null, this.post_meta__regular_price ? React.createElement('ins', { 'key': '1527' }, React.createElement('div', { 'className': 'woocommerce-Price-amount amount' }, React.createElement('span', { 'className': 'woocommerce-Price-currencySymbol' }, '$'), ' ', (() => {
                                    if (typeof this.post_meta__sale_price !== 'undefined') {
                                        return Number(this.post_meta__sale_price[0]).toLocaleString('en-US', { minimumFractionDigits: 2 });
                                    } else if (typeof this.post_meta__regular_price !== 'undefined') {
                                        return Number(this.post_meta__regular_price[0]).toLocaleString('en-US', { minimumFractionDigits: 2 });
                                    }
                                })(), '\n        ')) : null))), React.createElement('a', {
                                    'className': 'absLink',
                                    'href': this.url
                                })) : React.createElement('div', { 'className': 'cmTemplate_Unknow' }, JSON.stringify(this));
                            }, { count: undefined })];
                    }
                    return React.createElement('div', {}, this.SuggestionGroup ? React.createElement('li', {
                        'className': 'suggestion-category',
                        'key': '21'
                    }, this.SuggestionGroup) : null, React.createElement.apply(this, [
                        'div',
                        { 'className': 'cmRepeater_Items' },
                        _map(this.Items, repeatItems1.bind(this))
                    ]));
                }, { count: undefined })];
        }
        return React.createElement('ul', { 'className': 'cm_autocomplete suggestion-items cm-autocomplete-allPages cm-ui ui-widget ui-widget-content ui-menu ui-autocomplete cm_SearchBoxMenu' }, React.createElement.apply(this, [
            'div',
            { 'className': 'cmRepeater_SearchBoxMenuItem' },
            _map(this.SearchBoxMenuItem, repeatSearchBoxMenuItem1.bind(this))
        ]));
    }, {
        widgetName: 'undefined',
        items: undefined
    }), '\n  ', React.createElement('i', {
        'className': 'glyphicon glyphicon-search',
        'data-cm-role': 'add-query'
    }));
};