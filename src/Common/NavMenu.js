import { Component } from '../Core/Component.js';

const renderMarkup = (options) =>
    `
<nav class="nav-menu-wrap">
    <ul class="nav-menu">
        <li class="nav-menu__item">
            <a href="./index.html"><span>Home</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="./blog.html"><span>All posts</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="./categories.html"><span>Categories</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="./genres.html"><span>Genres</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="./concerts.html"><span>Concerts</span></a>
        </li>
        <li class="nav-menu__item">
            <a href="./reviews.html"><span>Reviews</span></a>
        </li>
    </ul>
</nav>
`

export class NavMenu extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}