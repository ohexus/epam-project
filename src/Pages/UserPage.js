import { Component } from '../Core/Component.js';
import { Header } from '../Common/Header/Header.js';
import { Footer } from '../Common/Footer/Footer.js';
import { getDataUsers } from '../Core/GetData.js';
import { findUser } from '../Core/Functions.js';
import { UserBar } from '../Common/User/UserBar.js';

const renderMarkup = (options) => `
<div class="page-wrap">       
    ${
        new Header().getMarkup()
    }
    <div class="user-page">

    </div>
    ${
        new Footer().getMarkup()
    }
</div>
`

export class UserPage extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
        window.addEventListener('load', this.routeHash);
        window.addEventListener('hashchange', this.routeHash);
    }

    routeHash = () => {
        let dataUsers = getDataUsers();

        let id = +window.location.hash.substr(1).split('/')[1];

        if ((typeof id === "number") && (id >= 0)) {
            let user = findUser(id, dataUsers);

            this.element.querySelector('.user-page').innerHTML = "";
            this.element.querySelector('.user-page').appendChild(new UserBar({
                avatarUrl: (dataUsers[user].avatarUrl === 'default') ? require('../Images/user-icon.svg') : dataUsers[user].avatarUrl,
                login: dataUsers[user].login
            }).getElement());
        }
    }
}