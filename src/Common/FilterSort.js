import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
    <div class="sort-filter">
        <select name="sort" id="filterSort">
            <option value="default" selected>Sort by...</option>
            <option value="pop">Most popular</option>
            <option value="likes">Most liked</option>
            <option value="new">New</option>
        </select>
    </div>
`

export class FilterSort extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}