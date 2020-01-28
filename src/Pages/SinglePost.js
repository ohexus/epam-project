import { Component } from '../Core/Component.js';
import { Header } from '../Common/Header.js';
import { Footer } from '../Common/Footer.js';
import { Post } from '../Common/Post.js';
import { getDataPosts, getDataUsers } from '../Core/GetData.js';
import { findUser, findArticleSize } from '../Core/SearchFunctions.js';

const renderMarkup = (options) =>
    `
    <div class="page-wrap">
            ${
                new Header().getMarkup()
            }
            <div id="postWrap">
            ${
                new Post().getMarkup()
            }
            </div>
            ${
                new Footer().getMarkup()
            }
    </div>
`

export class SinglePost extends Component {
    constructor(options) {

        let dataPosts = getDataPosts();
        let dataUsers = getDataUsers();

        let id;
        window.addEventListener('hashchange', () => {
            id = +window.location.hash.substr(1).split('/')[1];

            if ((typeof id === "number") && (id !== NaN)) {
                let currentPost = (() => {
                    for (let i = 0; i < dataPosts.length; i++) {
                        if (dataPosts[i].postId === id) {
                            return i;
                        }
                    }
                })();
                let currentUser = findUser(dataUsers, dataPosts[currentPost]);

                this.element.querySelector('#postWrap').innerHTML = "";
                this.element.querySelector('#postWrap').appendChild(new Post({
                    size: 'single',
                    postId: dataPosts[currentPost].postId,
                    imagePost: dataPosts[currentPost].imageUrl,
                    imageAvatar: dataUsers[currentUser].avatarUrl,
                    authorName: dataUsers[currentUser].name,
                    datePubl: dataPosts[currentPost].date.datePublished,
                    timePubl: dataPosts[currentPost].date.timePublished,
                    title: dataPosts[currentPost].article.title,
                    content: dataPosts[currentPost].article.content,
                    views: dataPosts[currentPost].stats.views,
                    likes: dataPosts[currentPost].stats.likes
                }).getElement());
            }
        });

        super(options, renderMarkup(options));
    }
}