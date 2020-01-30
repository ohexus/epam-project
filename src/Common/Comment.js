import { Component } from '../Core/Component.js';
import { findCurrentPost } from '../Core/Functions.js';

const renderMarkup = (options) =>
    `<div class="comments__comment">
        <div class="comment__info">
            <div class="comment__author">
                <img class="comment__author-avatar" src="${options.imageAvatar}">
                <div class="comment__author-name">${options.name}</div>
            </div>
            <div class="comment__date">
                <div class="comment__date-published">${options.datePubl}</div>
                <div class="comment__date-point">·</div>
                <div class="comment__time-published">${options.timePubl}</div>
            </div>
        </div>
        <div class="comment__content">${options.content}</div>
    </div>`

export class Comment extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}