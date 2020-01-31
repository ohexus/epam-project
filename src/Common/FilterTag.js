import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
    <div class="tag-filter">
        <select name="tag-filter id="tag-filter">
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
        </select>
    </div>
`

export class FilterTag extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}