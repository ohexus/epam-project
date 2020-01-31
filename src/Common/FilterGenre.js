import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
    <div class="genre-filter">
        <select name="genre" id="genre-filter">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
        </select>
    </div>
`

export class FilterGenre extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}