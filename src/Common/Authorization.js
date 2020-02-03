import { Component } from '../Core/Component.js';
import { AuthorizationForm } from './AuthorizationForm.js';
import { findUser, clearElement } from '../Core/Functions.js';
import { getDataUsers } from '../Core/GetData.js';
import { UserPanel } from './UserPanel.js';

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

        window.addEventListener('load', this.watchForm);
        window.addEventListener('hashchange', this.watchForm);
    }

    watchForm = () => {
        let activeUser = localStorage.getItem('activeUser');
        if (activeUser) {
            this.logIn(activeUser);
        } else {
            const auth = document.querySelector('.auth');
            const authInCheckbox = auth.querySelector('#authInCheckbox');
            const authUpCheckbox = auth.querySelector('#authUpCheckbox');
            authUpCheckbox.addEventListener('change', () => {
                if (authUpCheckbox.checked) authInCheckbox.checked = false;
            });
            authInCheckbox.addEventListener('change', () => {
                if (authInCheckbox.checked) authUpCheckbox.checked = false;
            });

            const showPasswordCheckbox = auth.querySelector('.auth-form__password-checkbox');
            showPasswordCheckbox.addEventListener('change', () => {
                this.showPassword(document.querySelector('#authPassword'));
            });

            this.checkForm(document.querySelector('#authForm'), authInCheckbox, authUpCheckbox);
        }
    }

    checkForm = (form, aIn, aUp) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let users = JSON.parse(localStorage.getItem('users'));
            let login = form.querySelector('#authLogin').value;
            let password = form.querySelector('#authPassword').value;

            if (login !== '' && password !== '') {
                if (aIn.checked) {
                    let authStatus = this.signInCheck(login, password, users);
                    if (authStatus === 'login') {
                        console.log(authStatus);
                        this.logIn(login);
                    }
                    if (authStatus === 'Invalid login') {
                        console.log(authStatus);
                        this.inputAnimation(form.querySelector('#authLogin'), authStatus);
                    }
                    if (authStatus === 'Invalid password') {
                        console.log(authStatus);
                        const passwordInput = form.querySelector('#authPassword');
                        this.inputAnimation(passwordInput, authStatus);
                        if (passwordInput.type === 'password') {
                            this.showPassword(passwordInput);
                            setTimeout(() => {
                                this.showPassword(passwordInput);
                            }, 1000);
                        }
                    }
                }
                if (aUp.checked) {
                    if (this.signUpCheck(login, password, users)) this.logIn(login);
                }
            }
        });
    }

    logIn = (login) => {
        localStorage.setItem('activeUser', login);
        let data = getDataUsers();
        let current = this.findUserInStorage(login, data);
        this.options = {
            avatarUrl: current ? data[current].avatarUrl : 'src/Images/user-icon.svg',
            login: login
        }
        document.querySelector('.auth').remove();
        document.querySelector('.header-row').insertAdjacentHTML('afterbegin', new UserPanel(this.options).getMarkup());
    }

    signInCheck = (login, password, users) => {
        for (let i = 0; i < users.length; i++) {
            if (login === users[i].login) {
                if (password === users[i].password) {
                    return 'login';
                } else {
                    return 'Invalid password';
                }
            }
        }
        return 'Invalid login';
    }

    signUpCheck = (login, password, users) => {
        if (this.findUserInStorage(login, users) || this.findUserInStorage(login, users) === 0) {
            this.inputAnimation(document.querySelector('#authLogin'), 'Username is already taken!');
            return false
        } else {
            let user = {
                login: login,
                password: password
            }
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('activeUser', login);
            return true;
        }
    }

    findUserInStorage = (login, data) => {
        for (let i = 0; i < data.length; i++) {
            if (login.toLowerCase() === data[i].login.toLowerCase()) {
                return i
            }
        }
        return false
    }

    showPassword = (elem) => {
        (elem.type === 'password') ? (elem.type = 'text') : (elem.type = 'password')
    }

    inputAnimation = (elem, value) => {
        elem.value = value;
        elem.style.background = '#DC143C';
        elem.style.opacity = '0.9';
        setTimeout(() => {
            elem.style.background = '#F5F5F5';
            elem.style.opacity = '1';
        }, 250);
        setTimeout(() => {
            elem.value = '';
        }, 1000);
    }
}