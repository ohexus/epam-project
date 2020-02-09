import { Component } from '../../Core/Component.js';
import { getDataGallery } from '../../Core/GetData.js';
import { GalleryImage } from './GalleryImage.js';
import { clearElement } from '../../Core/Functions.js';
import { PaginationPanel } from './Pagination/PaginationPanel.js';

const renderMarkup = (options) => `
    <div class="gallery"></div>
    <div class="pagination-wrap">
        <div class="pagination"></div>
    </div>
`

export class Gallery extends Component {
    constructor(options = {}) {
        let dataGallery = getDataGallery();
        options.data = dataGallery;
        options.galleryItems = 9;
        super(options, renderMarkup(options));

        window.addEventListener('load', () => {
            let prevPageId = 0;
            if (this.checkHash()) {
                this.fillGallery(dataGallery);
                this.pagination(dataGallery, prevPageId);
                prevPageId = this.checkHash();
            }
            window.addEventListener('hashchange', () => {
                if (this.checkHash()) {
                    this.fillGallery(dataGallery);
                    this.pagination(dataGallery, prevPageId);
                    prevPageId = this.checkHash();
                }
            });
        });
    }

    checkHash = () => {
        let hash = window.location.hash.substr(1).split('/');
        if (hash[0] === 'gallery') {
            if (!hash[1]) {
                window.location.href = '#gallery/1';
            } else {
                return hash[1]
            }
        } else {
            return false
        }
    }

    fillGallery = (data) => {
        let elem = document.querySelector('.gallery');
        let id = +window.location.hash.substr(1).split('/')[1];

        if ((typeof id === 'number') && (id > 0)) {
            clearElement(elem);
            let imagesPerPage = this.options.galleryItems;
            let imagesAmount = data.length;
            let currentImage = (id - 1) * imagesPerPage;
            for (let i = 0; i < (((imagesAmount - currentImage) > imagesPerPage) ? imagesPerPage : (imagesAmount - currentImage)); i++) {
                elem.insertAdjacentHTML('beforeend', new GalleryImage({
                    imageUrl: data[currentImage].imageUrl
                }).getMarkup());
                currentImage++;
            }
        } else {
            window.location.hash = '#gallery/1';
        }
    }

    pagination = (data, prev) => {
        let id = +window.location.hash.substr(1).split('/')[1];
        const pageId = id - 1;
        const pageIdPrev = prev - 1;
        let imagesPerPage = this.options.galleryItems;
        const imagesAmount = data.length;
        const pageIdFirst = 0;
        const pageIdLast = Math.ceil(imagesAmount / imagesPerPage) - 1;
        console.log(`id: ${pageId}|prev: ${pageIdPrev}|first: ${pageIdFirst}|last: ${pageIdLast}`);

        const sidePages = 1;
        const paginationElem = document.querySelector('.pagination');
        clearElement(paginationElem);

        paginationElem.insertAdjacentHTML('beforeend', new PaginationPanel({
            elem: paginationElem,
            id: pageId + 1,
            first: pageIdFirst,
            last: pageIdLast,
            variance: sidePages
        }).getMarkup());

        this.stylePagination(pageId, pageIdPrev, pageIdFirst, pageIdLast, sidePages);
    }

    stylePagination = (id, prev, first, last, variance) => {
        let elem = document.querySelector('.pagination');
        if ((id === first) || (id === last)) {
            let end = (id === first ? first : last);
            for (let i = 0; i < variance + 2; i++) {
                let current = (end === 0 ? i : (elem.children.length - 1 - i));
                elem.children[current].className += '_disabled';
                setTimeout(() => {
                    elem.children[current].style.opacity = '0';
                    elem.children[current].style.visibility = 'hidden';
                }, 250);
            }
        }
        if ((prev === first) || (prev === last)) {
            let end = (prev === first ? first : last);
            for (let i = 0; i < variance + 2; i++) {
                let current = (end === 0 ? i : (elem.children.length - 1 - i));
                elem.children[current].style.visibility = 'visible';
                elem.children[current].style.opacity = '0';
                setTimeout(() => {
                    elem.children[current].style.opacity = '1';
                }, 250);
            }
        }
    }
}