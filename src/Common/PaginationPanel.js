import { Component } from '../Core/Component.js';

const renderMarkup = (options) =>
    `
        <div class="pagination__item-${options.item}">
            <a href="${options.link}" class="pagination__link">${options.value}<</a>
        </div>
`

export class PaginationPanel extends Component {
    constructor(options) {
        super(options, renderMarkup(options));
    }
}