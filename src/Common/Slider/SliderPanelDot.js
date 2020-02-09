import { Component } from '../../Core/Component.js';

const renderMarkup = (options) =>
    `
    <label for="slide-${options.slideId}" class="slider-dot" id="slide-dot-${options.slideId}"></label>
`

export class SliderPanelDot extends Component {
    constructor(options) {
        super(options, renderMarkup(options));
    }
}