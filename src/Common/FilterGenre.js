import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
    <div class="genre-filter">
        <label for="filterGenre">Genre</label>
        <select name="genre" id="filterGenre" class="filter-select">
            <option value="all" selected ${options.disabled}>All</option>
            <option value="electronic">Electronic</option>
            <option value="jazz">Jazz</option>
            <option value="blues">Blues</option>
        </select>
    </div>
`

export class FilterGenre extends Component {
    constructor(options = {
        disabled: ''
    }) {
        super(options, renderMarkup(options));
    }
}