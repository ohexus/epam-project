import { Component } from '../../../Core/Component.js';
import { AuthorizationForm } from './AuthorizationForm.js';
import { watchForm } from '../../../Core/AuthorizationLogic.js'

const renderMarkup = (options) => `
        <div class="auth">
            <input type="checkbox" class="auth__checkbox" id="authUpCheckbox" name="authCheckbox">
            <label for="authUpCheckbox" class="auth__label">Sign Up</label>
            <input type="checkbox" class="auth__checkbox" id="authInCheckbox" name="authCheckbox">
            <label for="authInCheckbox" class="auth__label">Sign In</label>
            ${
                new AuthorizationForm().getMarkup()
            }
        </div>
`

export class Authorization extends Component {
    constructor(options) {
        super(options, renderMarkup(options));

        window.addEventListener('load', watchForm);
        window.addEventListener('load', () => {
            window.addEventListener('hashchange', watchForm);
        });
    }
}