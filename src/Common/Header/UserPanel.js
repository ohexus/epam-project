import { Component } from '../../Core/Component.js';
import { AuthorizationForm } from './Authorization/AuthorizationForm.js';

const renderMarkup = (options) => `
        <div class="user-panel">
            <div class="user-panel__name">${options.login}</div>
            <img class="user-panel__avatar" src="${options.avatarUrl}">
        </div>
`

export class UserPanel extends Component {
    constructor(options) {
        super(options, renderMarkup(options));
    }
}