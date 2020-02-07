import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
<label for="topicSelect" class="filter__select" placeholder="Topic...">
    <input class="filter__select-input select" type="radio" name="topic" id="topicSelect">
    <div class="filter__triangle"></div>
    <div class="filter__select-menu">
        <input class="filter__select-input" type="radio" name="topic" value="all" id="topicSelect[all]">
        <label class="filter__select-label" for="topicSelect[all]">All</label> 

        <input class="filter__select-input" type="radio" name="topic" value="concert" id="topicSelect[concert]">
        <label class="filter__select-label" for="topicSelect[concert]">Concert</label>

        <input class="filter__select-input" type="radio" name="topic" value="reviews" id="topicSelect[reviews]">
        <label class="filter__select-label" for="topicSelect[reviews]">Reviews</label>

        <input class="filter__select-input" type="radio" name="topic" value="interviews" id="topicSelect[interviews]">
        <label class="filter__select-label" for="topicSelect[interviews]">Interviews</label>

        <label class="filter__select-text">Topic</label>
    </div>
</label>
`

export class FilterTopic extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}