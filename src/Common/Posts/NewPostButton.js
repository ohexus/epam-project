import { Component } from '../../Core/Component.js';
import { ButtonMore } from './ButtonMore.js'
import { FiltersPanel } from '../Filter/FiltersPanel.js';
import { PostsPage } from './PostsPage.js';

const renderMarkup = (options) => `
<div class="new-post-btn">
    <input type"button" class="new-post-btn__btn" id="addNewPost">
        <label for="addNewPost" class="new-post-btn__label">Add new post</label>
    </input>
</div>
`

export class NewPostButton extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}