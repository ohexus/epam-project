import { Component } from '../Core/Component.js';

const renderMarkup = (options) => `
        <div class="auth-wrap">
            <label for="signUpCheckbox" class="sign-label">Sign Up</label>
            <input type="checkbox" class="sign-checkbox" id="signUpCheckbox" name="signIn">
            <form class="sign-form" id="signUpForm">
                <span class="sign__form-header">Sign Up</span>
                <input type="text" class="sign__form-login" id="signUpLogin" placeholder="Login">
                <input type="password" class="sign__form-password" id="signUpPassword" placeholder="Password">
                <input type="submit" class="sign__form-submit-btn">
            </form>
            
            <label for="signInCheckbox" class="sign-label">Sign In</label>
            <input type="checkbox" class="sign-checkbox" id="signInCheckbox" name="signIn">
            <form class="sign-form id="signInForm">
                <span class="sign__form-header">Sign In</span>
                <input type="text" class="sign__form-login" id="signInLogin" placeholder="Login">
                <input type="password" class="sign__form-password" id="signInPassword" placeholder="Password">
                <input type="submit" class="sign__form-submit-btn">
            </form>
        </div>
`

export class Authorization extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}