import { Component } from '../Core/Component.js';
import { NavMenu } from '../Common/NavMenu.js';

const renderMarkup = (options) =>
    `
<div class="header-wrap">
<header class="header">
    <div class="header-row">
        <div class="auth-wrap">
            <button type="button" class="auth__in">Sigh in</button>
            <button type="button" class="auth__up">Sigh up</button>
        </div>

        <div class="logo-wrap">
            <a class="logo" href="index.html">
                <i class="logo__image"></i>
            </a>
        </div>

        <form class="search">
            <input type="search" class="search__input" placeholder="Search here...">
            <button type="button" class="search__btn"></button>
        </form>
    </div>
    ${
        new NavMenu().getMarkup()
    }
</header>
</div>
`

{ /* <span class="logo__name">BLOG</span> */ }

export class Header extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}