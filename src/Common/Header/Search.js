import { Component } from '../../Core/Component.js';
import { searchWatch } from '../../Core/SearchLogic.js';

const renderMarkup = (options) => `
<div class="search">
    <form class="search__form" id="searchForm">
        <input type="text" class="search__input" placeholder="Search here..." value="" autofocus id="searchInput"> 
        <input type="button" class="search__cancel" id="searchCancel">
        <input type="submit" class="search__submit" id="searchSubmit">
    </form>

    <div class="search__results-wrap">
        <div class="search__results search__posts">
            <h5 class="search__label">Posts</h5>
            <ul class="search__posts-list"></ul>
        </div>
        
        <div class="search__results search__users">
            <h5 class="search__label">Users</h5>
            <ul class="search__users-list"></ul>
        </div>
    </div>
</div>
`

export class Search extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));

        window.addEventListener('load', searchWatch);
        window.addEventListener('load', () => {
            window.addEventListener('hashchange', searchWatch);
        });
    }
}