import { Component } from '../Core/Component.js';

const renderMarkup = (options) =>
    `
    <button type="button" class="more-btn" id="moreBtn">View more...</button>
`

export class ButtonMore extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}