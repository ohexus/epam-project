import { Component } from '../../Core/Component.js';
import { getDataComments, getDataUsers } from '../../Core/GetData.js';
import { findCurrentPost, findUser } from '../../Core/Functions.js';
import { Comment } from './Comment.js';

const renderMarkup = (options) =>
    `<div class="comments-wrap">
                <div class="comments__amount">
                    <span class="comments__amount-number">0</span>
                    <span>Comments</span>
                </div>
                <div class="comments">
                
                </div>
            </div>`

export class Comments extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));

        window.addEventListener('load', () => {
            if (window.location.hash.substr(1).split('/')[0] === 'post') {
                this.addComments();
            }

            window.addEventListener('hashchange', () => {
                if (window.location.hash.substr(1).split('/')[0] === 'post') {
                    this.addComments();
                }
            });
        });
    }

    addComments = () => {
        let id;
        id = +window.location.hash.substr(1).split('/')[1];

        if ((typeof id === "number") && (id >= 0)) {
            const comments = document.querySelector('.comments');
            const amountCommentsElem = document.querySelector('.comments__amount-number');

            let dataUsers = getDataUsers();
            let dataComments = getDataComments();
            let currentPost = findCurrentPost(id, dataComments);
            console.log(dataUsers);
            if (currentPost !== null) {
                if (comments.children.length != dataComments[currentPost].comments.length) {
                    amountCommentsElem.textContent = dataComments[currentPost].comments.length;
                    for (let i = 0; i < dataComments[currentPost].comments.length; i++) {
                        let currentUser = findUser(dataComments[currentPost].comments[i].userId, dataUsers);
                        comments.insertAdjacentHTML("beforeend", new Comment({
                            imageAvatar: dataUsers[currentUser].avatarUrl,
                            login: dataUsers[currentUser].login,
                            datePubl: dataComments[currentPost].comments[i].date.datePublished,
                            timePubl: dataComments[currentPost].comments[i].date.timePublished,
                            content: dataComments[currentPost].comments[i].comment
                        }).getMarkup());
                    }
                }
            } else {
                amountCommentsElem.textContent = '0';
                for (let i = comments.children.length - 1; i >= 0; i--) {
                    comments.removeChild(comments.children[i]);
                }
            }
        }
    }
}