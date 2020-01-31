import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
    <div class="genre-filter">
        <select name="genre" id="filterGenre">
            <option value="all" selected>All</option>
            <option value="electronic">Electronic</option>
            <option value="jazz">Jazz</option>
            <option value="blues">Blues</option>
        </select>
    </div>
`

export class FilterGenre extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}