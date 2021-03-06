import { Component } from '../../Core/Component.js';
import { FilterSort } from './FilterSort.js';
import { FilterGenre } from './FilterGenre.js';
import { FilterTopic } from './FilterTopic.js';
import { getDataPosts } from '../../Core/GetData.js';
import { clearElement } from '../../Core/Functions.js';

const renderMarkup = (options) => `
<form class="filters" id="filtersForm">
    <div class="filters__item filters__sort-filter"></div>
    <div class="filters__item filters__genre-filter"></div>
    <div class="filters__item filters__topic-filter"></div>
    <div class="filters__item">
        <input class="filter__submit" type="submit" id="filterSubmit">
        <label class="filter__submit-label" for="filterSubmit">Filter posts</label>
    </div>
</form> 
`

export class FiltersPanel extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));

        options.countListeners = 0;

        if (window.location.hash.substr(1).split('/')[0] === '') {
            window.addEventListener('load', () => this.filtering(options));
        } else {
            window.addEventListener('load', () => {
                window.addEventListener('hashchange', () => {
                    if (window.location.hash.substr(1).split('/')[0] === '') {
                        this.filtering(options);
                    }
                });
            });
        }
    }

    filtering = (options) => {
        const sortElem = document.querySelector('.filters__sort-filter');
        const genreElem = document.querySelector('.filters__genre-filter');
        const topicElem = document.querySelector('.filters__topic-filter');
        if (sortElem.children.length === 1) clearElement(sortElem);
        if (genreElem.children.length === 1) clearElement(genreElem);
        if (topicElem.children.length === 1) clearElement(topicElem);

        sortElem.insertAdjacentHTML('afterbegin', new FilterSort().getMarkup());
        genreElem.insertAdjacentHTML('afterbegin', new FilterGenre().getMarkup());
        topicElem.insertAdjacentHTML('afterbegin', new FilterTopic().getMarkup());

        if (options.countListeners === 0) {
            document.querySelector('#filtersForm').addEventListener('change', () => {
                options.dataPosts = getDataPosts();
                this.filterByGenre(genreElem.querySelector('[name=genre]:checked'), options);
                this.filterByTopic(topicElem.querySelector('[name=topic]:checked'), options);
                this.sortPosts(document.querySelector('[name=sort]:checked'), options);
            });
            options.countListeners++;
        }
    }

    sortPosts = (input, options) => {
        if (input) {
            switch (input.value) {
                case 'default':
                    options.dataPosts = options.dataPosts;
                    break;
                case 'pop':
                    options.dataPosts = options.dataPosts.sort((a, b) => b.stats.views - a.stats.views);
                    break;
                case 'likes':
                    options.dataPosts = options.dataPosts.sort((a, b) => b.stats.likes - a.stats.likes);
                    break;
                case 'new':
                    options.dataPosts = options.dataPosts.sort((a, b) => {
                        let dateA = a.date.datePublished.split('.');
                        let dateB = b.date.datePublished.split('.');
                        let timeA = a.date.timePublished.split(':');
                        let timeB = b.date.timePublished.split(':');

                        // Date: year, month, day, hour, minutes
                        dateA = new Date(dateA[2], dateA[1] - 1, dateA[0], timeA[0], timeA[1]);
                        dateB = new Date(dateB[2], dateB[1] - 1, dateB[0], timeB[0], timeB[1]);

                        return dateB - dateA;
                    });
                    break;
            }
        }
    }

    filterByGenre = (input, options) => {
        if (input) {
            switch (input.value) {
                case 'all':
                    options.dataPosts = options.dataPosts;
                    break;
                case 'electronic':
                    options.dataPosts = options.dataPosts.filter(post => post.genre === 'electronic');
                    break;
                case 'jazz':
                    options.dataPosts = options.dataPosts.filter(post => post.genre === 'jazz');
                    break;
                case 'blues':
                    options.dataPosts = options.dataPosts.filter(post => post.genre === 'blues');
                    break;
            }
        }
    }

    filterByTopic = (input, options) => {
        if (input) {
            switch (input.value) {
                case 'all':
                    options.dataPosts = options.dataPosts;
                    break;
                case 'concerts':
                    options.dataPosts = options.dataPosts.filter(post => post.topic === 'concert');
                    break;
                case 'reviews':
                    options.dataPosts = options.dataPosts.filter(post => post.topic === 'review');
                    break;
                case 'interviews':
                    options.dataPosts = options.dataPosts.filter(post => post.topic === 'interview');
                    break;
            }
        }
    }
}