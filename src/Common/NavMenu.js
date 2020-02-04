import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
<nav class="nav-menu-wrap">
    <input type="checkbox" id="navMenuCheckbox" class="nav-menu__checkbox">
    <label for="navMenuCheckbox" class="nav-menu__label"></label>
    <ul class="nav-menu">
        <li class="nav-menu__item">
            <a href="${options.home}" class="nav-menu__link"><span>Home</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="${options.genres}" class="nav-menu__link"><span>Genres</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="${options.concerts}" class="nav-menu__link"><span>Concerts</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="${options.gallery}" class="nav-menu__link"><span>Gallery</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="${options.reviews}" class="nav-menu__link"><span>Reviews</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="${options.interviews}" class="nav-menu__link"><span>Interviews</span></a>
        </li>
    </ul>
</nav>
`

export class NavMenu extends Component {
    constructor(options = {
        home: '',
        genres: '#genres',
        concerts: '#concerts',
        gallery: '#gallery/1',
        reviews: '#reviews',
        interviews: '#interviews'
    }) {
        super(options, renderMarkup(options));
    }
}