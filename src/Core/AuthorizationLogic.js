import { findUserByLogin } from './Functions.js';
import { getDataUsers } from './GetData.js';
import { UserPanel } from '../Common/Header/UserPanel.js';
let dataUsers = getDataUsers();
const defaultUserIcon = require('../Images/user-icon.svg');

function watchForm() {
    let activeUser = localStorage.getItem('activeUser');
    if (activeUser) {
        logIn(activeUser);
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

        auth.querySelector('.auth-form__password-checkbox').addEventListener('change', () => {
            const elem = document.querySelector('#authPassword');
            (elem.type === 'password') ? (elem.type = 'text') : (elem.type = 'password')
        });

        const form = document.querySelector('#authForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            checkForm(form, authInCheckbox, authUpCheckbox);
        });
    }
}

function checkForm(form, aIn, aUp) {
    let users = dataUsers;
    let login = form.querySelector('#authLogin').value;
    let password = form.querySelector('#authPassword').value;

    if (login !== '' && password !== '') {
        if (aIn.checked) {
            let authStatus = signInCheck(login, password, users);
            if (authStatus === 'login') {
                logIn(login);
            }
            if (authStatus === 'Invalid login') {
                inputAnimation(form.querySelector('#authLogin'), authStatus);
            }
            if (authStatus === 'Invalid password') {
                const passwordInput = form.querySelector('#authPassword');
                inputAnimation(passwordInput, authStatus);
                if (passwordInput.type === 'password') {
                    showPassword(passwordInput);
                    setTimeout(() => {
                        showPassword(passwordInput);
                    }, 1000);
                }
            }
        }
        if (aUp.checked) {
            if (signUpCheck(login, password, users)) logIn(login);
        }
    }
}

function logIn(login) {
    localStorage.setItem('activeUser', login);
    let current = findUserByLogin(login, dataUsers);
    if (document.querySelector('.auth')) {
        document.querySelector('.auth').remove();
        document.querySelector('.header-row').insertAdjacentHTML('beforeend', new UserPanel({
            userUrl: `#user/${current}`,
            avatarUrl: current ? ((dataUsers[current].avatarUrl === 'default') ? defaultUserIcon : dataUsers[current].avatarUrl) : defaultUserIcon,
            login: login
        }).getMarkup());
    }
    if (document.querySelector('.new-post-btn')) document.querySelector('.new-post-btn').style.display = 'flex';
    document.querySelector('.user-panel__sign-out').addEventListener('click', () => {
        localStorage.removeItem('activeUser');
        document.querySelector('.new-post-btn').style.display = 'none';
        window.location.reload();
    });
}

function signInCheck(login, password, users) {
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

function signUpCheck(login, password, users) {
    if (findUserByLogin(login, users) || findUserByLogin(login, users) === 0) {
        inputAnimation(document.querySelector('#authLogin'), 'Username is already taken!');
        return false
    } else {
        let user = {
                userId: Math.round((Math.random() * 1000)),
                login: login,
                password: password,
                authority: `user`,
                avatarUrl: `default`
            }
            // users.push(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('activeUser', login);
        return true;
    }
}

function inputAnimation(elem, value) {
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

export { watchForm }