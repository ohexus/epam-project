import { Component } from '../../Core/Component.js';

const renderMarkup = (options) => `
<li class="search__result-item">
    <a class="search__result-link" href="${options.link}">
        <img class="search__result-img" src="${options.img}">
        <span class="search__result-context">${options.context}</span>
    </a>
</li>
`

export class SearchItem extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}