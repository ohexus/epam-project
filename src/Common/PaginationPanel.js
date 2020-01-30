import { Component } from '../Core/Component.js';
import { clearElement } from '../Core/Functions.js';
import { PaginationItem } from './PaginationItem.js';

const renderMarkup = (options) => `
`

export class PaginationPanel extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));

        this.changePaginationPanel(options.elem, options.id, options.first, options.last, options.variance);
    }

    changePaginationPanel = (elem, id, first, last, variance) => {
        clearElement(elem);
        for (let i = 0; i < ((variance * 2) + 1); i++) {
            let pageId = ((id - (i - variance) === first || (id - (i - variance) === last + 2)) ? '' : id - (i - variance));
            elem.insertAdjacentHTML('afterbegin', new PaginationItem({
                item: 'page',
                id: pageId,
                value: pageId
            }).getMarkup());
        }
        elem.insertAdjacentHTML('afterbegin', new PaginationItem({
            item: 'previous',
            id: id - 1,
            value: '<'
        }).getMarkup());
        elem.insertAdjacentHTML('beforeend', new PaginationItem({
            item: 'next',
            id: id + 1,
            value: '>'
        }).getMarkup());
        elem.insertAdjacentHTML('afterbegin', new PaginationItem({
            item: 'first',
            id: first + 1,
            value: '<<'
        }).getMarkup());
        elem.insertAdjacentHTML('beforeend', new PaginationItem({
            item: 'last',
            id: last + 1,
            value: '>>'
        }).getMarkup());
    }
}