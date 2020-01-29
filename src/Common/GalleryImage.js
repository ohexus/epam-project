import { Component } from '../Core/Component.js';

const renderMarkup = (options) =>
    `
<div class="gallery__item">
    <img class="gallery__image" src="${options.imageUrl}">
</div>
`

export class GalleryImage extends Component {
    constructor(options) {
        super(options, renderMarkup(options));
    }
}