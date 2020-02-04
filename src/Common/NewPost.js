import { Component } from '../Core/Component.js';
import { FilterTopic } from './FilterTopic.js';
import { FilterGenre } from './FilterGenre.js';

const renderMarkup = (options) => `
<div class="new-post post-single">
    <h3 class="new-post__header">New Post</h3>
    <label class="new-post__label" for="new-post__title">Title</label>
    <input type="text" class="new-post__title-input" name="new-post__title" id="newPostTitle" maxlength="40">
    <label class="new-post__label" for="new-post__content">Content</label>
    <div contenteditable="true" class="new-post__content-input" name="new-post__content" id="newPostContent"></div>
    <div class="new-post__selects">
        ${
            new FilterTopic(options).getMarkup()
        }
        ${
            new FilterGenre(options).getMarkup()
        }
    </div>
    <div class="new-post__panel">
        <label for="imageUploadBtn" class="new-post__image-label">Upload image</label>
        <input type="file" accept="image/*" class="new-post__image-input" id="imageUploadBtn">
        <img class="new-post__image-preview" id="previewImage">
        <input type="submit" value="Public post" class="new-post__submit" id="newPostSubmit">
    </div>
    <div class="new-post__alert">
        <span class="new-post__alert-text">You need to fill all the forms except content(if you post only image) and choose topic and genre</span>
    </div>
</div>
`

export class NewPost extends Component {
    constructor(options = {
        disabled: 'disabled'
    }) {
        super(options, renderMarkup(options));
    }
}