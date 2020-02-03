import { Component } from '../Core/Component.js';
import { NavMenu } from '../Common/NavMenu.js';
import { Authorization } from './Authorization.js';

const renderMarkup = (options) =>
    `
<div class="header-wrap">
<header class="header" id="header">
    <div class="header-row">
        ${
            new Authorization().getMarkup()
        }
        <div class="logo-wrap">
            <a class="logo" href="index.html">
                <i class="logo__image"></i>
            </a>
        </div>

        <div class="search-wrap">
            <form class="search">
                <input type="search" class="search__input" placeholder="Search here...">
                <button type="button" class="search__btn"></button>
            </form>
        </div>
    </div>
    ${
        new NavMenu().getMarkup()
    }
</header>
</div>
`

export class Header extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
        window.addEventListener('load', () => {
            console.log('load');
        });

    }
}