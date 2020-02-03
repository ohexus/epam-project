import { Component } from '../Core/Component.js';
import { Header } from '../Common/Header.js';
import { Footer } from '../Common/Footer.js';
import { Post } from '../Common/Post.js';
import { Comments } from '../Common/Comments.js';
import { getDataPosts, getDataUsers } from '../Core/GetData.js';
import { findUser } from '../Core/Functions.js';

const renderMarkup = (options) =>
    `
    <div class="page-wrap">
            <div id="postWrap">
            ${
                new Post().getMarkup()
            }
            </div>
            ${
                new Comments().getMarkup()
            }
            ${
                new Footer().getMarkup()
            }
    </div>
`

export class SinglePost extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));

        window.addEventListener('load', this.routeHash);
        window.addEventListener('hashchange', this.routeHash);

        window.addEventListener('load', () => {
            if (window.location.hash.substr(1).split('/')[0] === 'post') {
                document.querySelector('.page-wrap').insertAdjacentHTML('afterbegin', new Header().getMarkup());
            } else {
                window.addEventListener('hashchange', () => {
                    if (window.location.hash.substr(1).split('/')[0] === 'post') {
                        if (document.querySelector('.header-wrap')) document.querySelector('.header-wrap').remove();
                        document.querySelector('.page-wrap').insertAdjacentHTML('afterbegin', new Header().getMarkup());
                    }
                });
            }
        });
    }

    routeHash = () => {
        let dataPosts = getDataPosts();
        let dataUsers = getDataUsers();

        let id = +window.location.hash.substr(1).split('/')[1];

        if ((typeof id === "number") && (id >= 0)) {
            let currentPost = (() => {
                for (let i = 0; i < dataPosts.length; i++) {
                    if (dataPosts[i].postId === id) {
                        return i;
                    }
                }
            })();
            let currentUser = findUser(dataPosts[currentPost].userId, dataUsers);

            this.element.querySelector('#postWrap').innerHTML = "";
            this.element.querySelector('#postWrap').appendChild(new Post({
                size: 'single',
                postId: dataPosts[currentPost].postId,
                imagePost: dataPosts[currentPost].imageUrl,
                imageAvatar: dataUsers[currentUser].avatarUrl,
                login: dataUsers[currentUser].login,
                datePubl: dataPosts[currentPost].date.datePublished,
                timePubl: dataPosts[currentPost].date.timePublished,
                title: dataPosts[currentPost].article.title,
                content: dataPosts[currentPost].article.content,
                views: dataPosts[currentPost].stats.views,
                likes: dataPosts[currentPost].stats.likes
            }).getElement());
        }
    }
}