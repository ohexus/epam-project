import { Component } from '../Core/Component.js';
import { getDataGallery } from '../Core/GetData.js';
import { GalleryImage } from '../Common/GalleryImage.js';



const renderMarkup = (options) =>
    `
    <div class="gallery">

    </div>
    <div class="pagination">

    </div>
`

export class Gallery extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));

        let dataGallery = getDataGallery();
        window.addEventListener('load', () => {
            if (this.checkHash()) {
                let galleryElem = document.querySelector('.gallery');
                if (galleryElem !== null) {
                    this.fillGallery(galleryElem, dataGallery);
                }
            }

            window.addEventListener('hashchange', () => {
                if (this.checkHash()) {
                    let galleryElem = document.querySelector('.gallery');
                    if (galleryElem !== null) {
                        this.fillGallery(galleryElem, dataGallery);
                    }
                }
            });
        });
    }



    checkHash = () => {
        let hash = window.location.hash.substr(1).split('/');
        if (hash[0] === 'gallery') {
            if (!hash[1]) {
                window.location.hash = '#gallery/1'
            } else {
                return true
            }
        } else {
            return false
        }
    }

    fillGallery = (galleryElem, dataGallery) => {
        let id = +window.location.hash.substr(1).split('/')[1];

        if ((typeof id === 'number') && (id > 0)) {
            this.pagination(galleryElem, dataGallery, id);
        } else {
            window.location.hash = '#gallery/1';
        }
    }

    pagination = (elem, data, id) => {
        const pageId = id - 1;
        const imagesPerPage = 9;
        const imagesAmount = data.length;
        const pageIdFirst = 0;
        const pageIdLast = Math.ceil(imagesAmount / imagesPerPage);

        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }

        let currentImage = pageId * imagesPerPage;

        if ((imagesAmount - currentImage) > imagesPerPage) {
            for (let i = 0; i < imagesPerPage; i++) {
                elem.insertAdjacentHTML('beforeend', new GalleryImage({
                    imageUrl: data[currentImage].imageUrl
                }).getMarkup());
                currentImage++;
            }
        } else {
            for (let i = 0; i < (imagesAmount - currentImage); i++) {
                elem.insertAdjacentHTML('beforeend', new GalleryImage({
                    imageUrl: data[currentImage].imageUrl
                }).getMarkup());
                currentImage++;
            }
        }

        const paginationElem = document.querySelector('.pagination');
        console.log(paginationElem);
        // for
    }
}