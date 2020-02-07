import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
<label for="genreSelect" class="filter__select" placeholder="Genre...">
    <input class="filter__select-input select" type="radio" name="genre" id="genreSelect">
    <div class="filter__triangle"></div>
    <div class="filter__select-menu">
        <input class="filter__select-input" type="radio" name="genre" value="all" id="genreSelect[all]">
        <label class="filter__select-label" for="genreSelect[all]">All</label> 

        <input class="filter__select-input" type="radio" name="genre" value="electronic" id="genreSelect[electronic]">
        <label class="filter__select-label" for="genreSelect[electronic]">Electronic</label>

        <input class="filter__select-input" type="radio" name="genre" value="jazz" id="genreSelect[jazz]">
        <label class="filter__select-label" for="genreSelect[jazz]">Jazz</label>

        <input class="filter__select-input" type="radio" name="genre" value="blues" id="genreSelect[blues]">
        <label class="filter__select-label" for="genreSelect[blues]">Blues</label>

        <label class="filter__select-text">Genre</label>
    </div>
</label>
`

export class FilterGenre extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}