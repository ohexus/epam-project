import { Component } from '../../Core/Component.js';

const renderMarkup = (options) => `
<label for="sortSelect" class="filter__select" placeholder="Sort by...">
    <input class="filter__select-input select" type="radio" name="sort" id="sortSelect">
    <div class="filter__triangle"></div>
    <div class="filter__select-menu">
        <input class="filter__select-input" type="radio" name="sort" value="default" id="sortSelect[default]">
        <label class="filter__select-label" for="sortSelect[default]">Default</label> 

        <input class="filter__select-input" type="radio" name="sort" value="pop" id="sortSelect[pop]">
        <label class="filter__select-label" for="sortSelect[pop]">Pop</label>

        <input class="filter__select-input" type="radio" name="sort" value="likes" id="sortSelect[likes]">
        <label class="filter__select-label" for="sortSelect[likes]">Likes</label>

        <input class="filter__select-input" type="radio" name="sort" value="new" id="sortSelect[new]">
        <label class="filter__select-label" for="sortSelect[new]">New</label>

        <label class="filter__select-text">Sort by...</label>
    </div>
</label>
`

export class FilterSort extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}