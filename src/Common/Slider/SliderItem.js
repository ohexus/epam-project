import { Component } from '../../Core/Component.js';

const renderMarkup = (options) =>
    `
<input type="radio" name="radio-slider" class="radio-slider" id="slide-${options.slideId}">
<li class="slider__item">
        <img class="slider__item-image" src=${options.imageUrl}></img>

    <div class="slider__item-content">
        <h4 class="item-content__title">${options.title}</h4>
        <p class="item-content__content">${options.content}</p>
    </div>
</li>
`

export class SliderItem extends Component {
    constructor(options) {
        super(options, renderMarkup(options));
    }
}