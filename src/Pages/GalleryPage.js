import { Component } from '../Core/Component.js';
import { Header } from '../Common/Header.js';
import { Footer } from '../Common/Footer.js';
import { Gallery } from '../Common/Gallery.js';

const renderMarkup = (options) =>
    `
    <div class="page-wrap">
            ${
                new Gallery().getMarkup()
            }
            ${
                new Footer().getMarkup()
            }
    </div>
`

export class GalleryPage extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));

        window.addEventListener('load', () => {
            if (window.location.hash.substr(1).split('/')[0] === 'gallery') {
                document.querySelector('.page-wrap').insertAdjacentHTML('afterbegin', new Header().getMarkup());
            } else {
                window.addEventListener('hashchange', () => {
                    if (window.location.hash.substr(1).split('/')[0] === 'gallery') {
                        if (document.querySelector('.header-wrap')) document.querySelector('.header-wrap').remove();
                        document.querySelector('.page-wrap').insertAdjacentHTML('afterbegin', new Header().getMarkup());
                    }
                });
            }
        });
    }
}