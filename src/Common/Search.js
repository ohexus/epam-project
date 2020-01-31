import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
<form class="search">
    <input type="text" class="search__input" placeholder="Search..." value="" autofocus=""> 
    <button type="button" class="search__btn">✘</button>
</form>
`

export class FilterSort extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}