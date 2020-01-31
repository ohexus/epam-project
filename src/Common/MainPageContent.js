import { Component } from '../Core/Component.js';
import { ButtonMore } from './ButtonMore.js'
import { FiltersPanel } from './FiltersPanel.js';
import { PostsPage } from './PostsPage.js';

const renderMarkup = (options) => `
<div class="main-wrap">
    <div class="filters-wrap">
       ${
           options.FilterPanel.getMarkup()
        }
    </div>

    <div class="posts-wrap">
        ${
            options.PostPage.getMarkup()
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
        let FilterPanel = new FiltersPanel(options);
        options.FilterPanel = FilterPanel;
        let PostPage = new PostsPage(options);
        options.PostPage = PostPage;
        super(options, renderMarkup(options));
    }
}