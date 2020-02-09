import { Component } from '../../Core/Component.js';

const renderMarkup = (options) =>
    `
    <input type="button" class="more-btn" id="moreBtn" value="View more...">
`

export class ButtonMore extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}