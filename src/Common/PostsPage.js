import { Component } from '../Core/Component.js';
import { addPosts } from '../Core/AddPosts.js';
import { findStrEnd, clearElement } from '../Core/Functions.js';

const renderMarkup = (options) => `
<div class="posts" id="posts"></div>
<div class="new-post-btn">
    <button type"button" class="new-post-btn__btn" id="addNewPost">
        <img class="new-post-btn__icon" src="./src/Images/new-post-plus.svg">
    </button>
    <label for="addNewPost" class="new-post-btn__label">Add new post</label>
</div>
`

export class PostsPage extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
        options.countListeners = 0;
        console.log(localStorage);
        if (window.location.hash.substr(1).split('/')[0] === '') {
            window.addEventListener('load', () => this.posts(options));
        } else {
            window.addEventListener('load', () => {
                window.addEventListener('hashchange', () => {
                    if (window.location.hash.substr(1).split('/')[0] === '') {
                        this.posts(options);
                    }
                });
            });
        }
    }

    addCheckPosts = (options) => {
        let postsElem = document.getElementById('posts');
        postsElem.insertAdjacentHTML("beforeend", addPosts(options));
        this.changeContentHeight(postsElem.children, options.dataPosts);
        this.addLinks(postsElem.children);
        moreBtn.style.display = (postsElem.children.length === options.dataPosts.length) ? 'none' : 'block';
    }

    posts = (options) => {
        let postsElem = document.getElementById('posts');

        postsElem.insertAdjacentHTML("beforeend", addPosts(options));
        this.changeContentHeight(postsElem.children, options.dataPosts);
        this.addLinks(postsElem.children);
        options.postsElem = postsElem;

        document.querySelector('.new-post-btn').addEventListener('click', () => {
            window.location.hash = '#newpost';
        });

        const moreBtn = document.getElementById('moreBtn');
        moreBtn.addEventListener('click', () => {
            this.addCheckPosts(options);
        });
        document.querySelector('#filtersForm').addEventListener('submit', (e) => {
            e.preventDefault();

            const posts = document.querySelector('.posts-wrap');
            clearElement(posts);
            options.postsFilled = 0;
            options.currentPost = 0;
            posts.insertAdjacentHTML('afterbegin', new PostsPage(options).getMarkup());
            document.querySelector('.new-post-btn').addEventListener('click', () => {
                window.location.hash = '#newpost';
            });

            this.addCheckPosts(options);
        });
        window.addEventListener('resize', () => {
            this.changeContentHeight(postsElem.children, options.dataPosts);
        });
    }

    addLinks = (posts) => {
        for (let i = 0; i < posts.length; i++) {
            let postId = posts[i].querySelector('.post__link').dataset.id;
            posts[i].querySelector('.post__link').addEventListener('click', () => {
                window.location.hash = `#post/${postId}`;
            });
        }
    }

    changeContentHeight = (posts, articles) => {
        for (let i = 0; i < posts.length; i++) {
            const contentWrap = posts[i].querySelector('.post__content-wrap');
            const content = posts[i].querySelector('.post__content');
            content.textContent = articles[i].article.content;
            while (content.offsetHeight > contentWrap.offsetHeight) {
                content.textContent = findStrEnd(content.textContent);
            }
        }
    }
}