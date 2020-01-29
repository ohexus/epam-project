import { Component } from '../Core/Component.js';

const renderMarkup = (options) =>
    `
<nav class="nav-menu-wrap">
    <ul class="nav-menu">
        <li class="nav-menu__item">
            <a href="${options.home}" class="nav-menu__link"><span>Home</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="${options.blog}" class="nav-menu__link"><span>Blog</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="${options.categories}" class="nav-menu__link"><span>Categories</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="${options.genres}" class="nav-menu__link"><span>Genres</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="${options.concerts}" class="nav-menu__link"><span>Concerts</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="${options.reviews}" class="nav-menu__link"><span>Reviews</span></a>
        </li>
    </ul>
</nav>
`

export class NavMenu extends Component {
    constructor(options = {
        home: '',
        blog: '#blog',
        categories: '#categories',
        genres: '#genres',
        concerts: '#concerts',
        reviews: '#reviews'
    }) {
        super(options, renderMarkup(options));
    }
}