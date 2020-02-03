import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
<form class="auth-form" id="authForm">
    <label for="authLogin" class="auth-form__label">Login</label>
    <input type="text" class="auth-form__login" id="authLogin" placeholder="Login" required>
    <label for="authPassword" class="auth-form__label">Password</label>
    <input type="password" class="auth-form__password" id="authPassword" placeholder="Password" required>
    <div class="auth-form__panel">
        <input type="checkbox" name="password-checkbox" class="auth-form__password-checkbox">
        <label for="password-checkbox" class="auth-form__password-label">show password?</label>
        <input type="submit" class="auth-form__submit" value="Submit">
    </div>
</form>
`

export class AuthorizationForm extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}