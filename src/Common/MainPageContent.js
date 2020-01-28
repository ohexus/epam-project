import { Component } from '../Core/Component.js';
import { addPosts } from '../Core/AddPosts.js'
import { ButtonMore } from './ButtonMore.js'

const renderMarkup = (options) =>
    `
<div class="main-wrap">
<div class="posts-wrap">
    <div class="posts" id="posts">
    </div>
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