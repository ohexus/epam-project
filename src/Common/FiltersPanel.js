import { Component } from '../Core/Component.js';
import { FilterSort } from './FilterSort.js';
import { FilterGenre } from './FilterGenre.js';
import { FilterTag } from './FilterTag.js';
import { clearElement } from '../Core/Functions.js';
import { addPosts } from '../Core/AddPosts.js';
import { PostsPage } from './PostsPage.js';

const renderMarkup = (options) => `
<div class="filters">
    <div class="filters__sort-filter">

    </div>
    <div class="filters__genre-filter">

    </div>
    <div class="filters__tag-filter">

    </div>
</div> 
`

export class FiltersPanel extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));

        if (window.location.hash.substr(1).split('/')[0] === '') {
            window.addEventListener('load', () => {
                const filtersElem = document.querySelector('.filters');
                const sortElem = filtersElem.querySelector('.filters__sort-filter');
                const genreElem = filtersElem.querySelector('.filters__genre-filter');
                const tagElem = filtersElem.querySelector('.filters__tag-filter');

                sortElem.insertAdjacentHTML('afterbegin', new FilterSort().getMarkup());
                genreElem.insertAdjacentHTML('afterbegin', new FilterGenre().getMarkup());
                tagElem.insertAdjacentHTML('afterbegin', new FilterTag().getMarkup());

                let sortSelect = sortElem.querySelector('#sortFilter');
                sortSelect.addEventListener('change', () => {
                    this.sortPosts(sortSelect, options);
                });
            });
        }
    }

    sortPosts = (elem, options) => {
        let index = elem.selectedIndex;
        switch (elem.options[index].value) {
            case 'pop':
                options.dataPosts = options.dataPosts.sort((a, b) => b.stats.views - a.stats.views);
                break;
            case 'likes':
                options.dataPosts = options.dataPosts.sort((a, b) => b.stats.likes - a.stats.likes);
                break;
            case 'new':
                options.dataPosts = options.dataPosts.sort((a, b) => b.stats.views - a.stats.views);
                break;
        }

        let posts = document.querySelector('.posts-wrap');
        clearElement(posts);
        posts.appendChild(new PostsPage(options).getElement());
    }
}