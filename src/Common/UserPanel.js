import { Component } from '../Core/Component.js';
import { AuthorizationForm } from './AuthorizationForm.js';

const renderMarkup = (options) => `
        <div class="user-panel">
            <img class="user-panel__avatar" src="${options.avatarUrl}">
            <div class="user-panel__name">${options.login}</div>
        </div>
`

export class UserPanel extends Component {
    constructor(options) {
        super(options, renderMarkup(options));
    }
}