import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
    <div class="topic-filter">
        <select name="topic" id="filterTopic">
            <option value="all" selected>all</option>
            <option value="concert">Concerts</option>
            <option value="review">Reviews</option>
            <option value="interview">Interviews</option>
        </select>
    </div>
`

export class FilterTopic extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}