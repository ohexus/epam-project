import { Component } from '../Core/Component.js';
import { getDataSlider } from '../Core/GetData.js';
import { SliderPanelDot } from './SliderPanelDot.js';
import { SliderItem } from './SliderItem.js';

const renderMarkup = (options) =>
    `
<ul class="slider" id="slider">
    
    <li class="slider-panel"></li>
</ul>
`

export class Slider extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));

        let dataSlider = getDataSlider();

        window.addEventListener('DOMContentLoaded', () => {
            const sliderElem = document.querySelector('.slider');
            const sliderPanel = sliderElem.querySelector('.slider-panel');

            for (let i = 0; i < dataSlider.length; i++) {
                sliderElem.insertAdjacentHTML('afterbegin', new SliderItem({
                    slideId: dataSlider[i].slideId,
                    imageUrl: dataSlider[i].imageUrl,
                    title: dataSlider[i].article.title,
                    content: dataSlider[i].article.content
                }).getMarkup());
                sliderPanel.insertAdjacentHTML('beforeend', new SliderPanelDot({
                    slideId: dataSlider[i].slideId,
                }).getMarkup());
            }

            sliderElem.getElementsByClassName('radio-slider')[0].setAttribute('checked', 'checked');
        });
    }

    addItems = () => {

    }
}