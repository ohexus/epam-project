import { Component } from '../Core/Component.js';

const renderMarkup = (options) =>
    `
            <span>ERROR</span>
`

export class Error extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}