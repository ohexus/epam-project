import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
        <div class="pagination__item pagination__item-${options.item}">
            <a href="#gallery/${options.id}" class="pagination__link">${options.value}</a>
        </div>
`

export class PaginationItem extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}