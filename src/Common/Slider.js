import { Component } from '../Core/Component.js';

const renderMarkup = (options) =>
    `
<ul class="slider" id="slider">
<input type="radio" name="radio-slider" class="radio-slider" id="slide-1">
<li class="slider__item">
    <img class="slider__item-image">
    <div class="slider__item-content">
        <h4 class="item-content__title"></h4>
        <p class="item-content__content"></p>
    </div>
</li>

<input type="radio" name="radio-slider" class="radio-slider" id="slide-2" checked>
<li class="slider__item">
    <img class="slider__item-image">
    <div class="slider__item-content">
        <h4 class="item-content__title"></h4>
        <p class="item-content__content"></p>
    </div>
</li>

<input type="radio" name="radio-slider" class="radio-slider" id="slide-3">
<li class="slider__item">
    <img class="slider__item-image">
    <div class="slider__item-content">
        <h4 class="item-content__title"></h4>
        <p class="item-content__content"></p>
    </div>
</li>

<input type="radio" name="radio-slider" class="radio-slider" id="slide-4">
<li class="slider__item">
    <img class="slider__item-image">
    <div class="slider__item-content">
        <h4 class="item-content__title"></h4>
        <p class="item-content__content"></p>
    </div>
</li>

<input type="radio" name="radio-slider" class="radio-slider" id="slide-5">
<li class="slider__item">
    <img class="slider__item-image">
    <div class="slider__item-content">
        <h4 class="item-content__title"></h4>
        <p class="item-content__content"></p>
    </div>
</li>

<li class="slider-panel">
    <label for="slide-1" class="slider-dot" id="slide-dot-1"></label>
    <label for="slide-2" class="slider-dot" id="slide-dot-2"></label>
    <label for="slide-3" class="slider-dot" id="slide-dot-3"></label>
    <label for="slide-4" class="slider-dot" id="slide-dot-4"></label>
    <label for="slide-5" class="slider-dot" id="slide-dot-5"></label>
</li>
</ul>
`

export class Slider extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}