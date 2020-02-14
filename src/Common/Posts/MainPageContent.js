import { Component } from '../../Core/Component.js';
import { ButtonMore } from './ButtonMore.js'
import { FiltersPanel } from '../Filter/FiltersPanel.js';
import { PostsPage } from './PostsPage.js';

const renderMarkup = (options) => `
<div class="main-wrap">
    <div class="filters-wrap">
       ${
        new FiltersPanel(options).getMarkup()
        }
    </div>
    <div class="posts-wrap">
        ${
            new PostsPage(options).getMarkup()
        }
    </div>
    <div class="more-btn-wrap">
       ${
           new ButtonMore().getMarkup()
       }
    </div>
</div> 
`

export class MainPageContent extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}