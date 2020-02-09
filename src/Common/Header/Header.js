import { Component } from '../../Core/Component.js';
import { NavMenu } from './NavMenu.js';
import { Authorization } from './Authorization/Authorization.js';
import { Search } from './Search.js';

const renderMarkup = (options) => `
<div class="header-wrap">
    <header class="header" id="header">
        <div class="header-row">
            <div class="search-wrap">
                ${
                    new Search().getMarkup()
                }
            </div>
            <div class="logo-wrap">
                <a class="logo" href="">
                    <i class="logo__image"></i>
                </a>
            </div>
            ${
                new Authorization().getMarkup()
            }
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
    }
}