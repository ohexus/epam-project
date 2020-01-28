import { Component } from '../Core/Component.js';

const renderMarkup = (options) =>
    `
    <div class="comments-wrap">
                <div class="comments__amount">
                    <span class="comments__amount-number">0</span>
                    <span>Comments</span>
                </div>
                <div class="comments">

                </div>
            </div>
`

export class Error extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}