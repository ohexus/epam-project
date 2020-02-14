import { Component } from '../../Core/Component.js';

const renderMarkup = (options) => `
<div class="user-bar">
    <img class="user-bar__avatar" src="${options.avatarUrl}">
    <div class="user-bar__login">${options.login}</div>
</div>
`

export class UserBar extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}