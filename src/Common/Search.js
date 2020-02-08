import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
<form class="search">
    <input type="text" class="search__input" placeholder="Search..." value="" autofocus=""> 
    <input type="button" class="search__cancel">
    <input type="submit" class="search__submit">
</form>
`

export class Search extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}