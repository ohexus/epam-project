import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
    <div class="topic-filter">
        <label for="filterTopic">Topic</label>
        <select name="topic" id="filterTopic" class="filter-select">
            <option value="all" selected ${options.disabled}>All</option>
            <option value="concert">Concerts</option>
            <option value="review">Reviews</option>
            <option value="interview">Interviews</option>
        </select>
    </div>
`

export class FilterTopic extends Component {
    constructor(options = {
        disabled: ''
    }) {
        super(options, renderMarkup(options));
    }
}