import { Component } from '../../Core/Component.js';
import { AuthorizationForm } from './Authorization/AuthorizationForm.js';

const renderMarkup = (options) => `
        <div class="user-panel">
            <div class="user-panel__name">${options.login}</div>
            <label class="user-panel__label" for="userPanelMenu">
                <img class="user-panel__avatar" src="${options.avatarUrl}">
            </label>
            <input type="checkbox" class="user-panel__menu-input" id="userPanelMenu"></input>
            <div class="user-panel__menu-wrap">
                <ul class="user-panel__menu">
                    <li class="user-panel__menu-item">
                        <a class="user-panel__menu-link" href="${options.userUrl}">
                            <img class="user-panel__avatar_menu" src="${options.avatarUrl}">
                            <div class="user-panel__name_menu">${options.login}</div>
                            <img class="user-panel__arrow" src="${require('../../Images/user-link-arrow.svg')}">
                        </a>
                    </li>
                    <li class="user-panel__menu-item">
                        <a class="user-panel__menu-link"><span>Options</span></a>
                    </li>
                    <li class="user-panel__menu-item">
                        <input type="button" class="user-panel__sign-out" value="Sign out"></input>
                    </li>
                </ul>
            </div>
        </div>
`

export class UserPanel extends Component {
    constructor(options) {
        super(options, renderMarkup(options));
    }
}