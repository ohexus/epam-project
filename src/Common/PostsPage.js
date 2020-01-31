import { Component } from '../Core/Component.js';
import { addPosts } from '../Core/AddPosts.js';
import { findStrEnd, clearElement } from '../Core/Functions.js';

const renderMarkup = (options) => `
<div class="posts" id="posts"></div>
`

export class PostsPage extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));

        if (window.location.hash.substr(1).split('/')[0] === '') {
            this.checkPosts(options);
            window.addEventListener('load', () => this.posts(options));
        } else {
            window.addEventListener('load', () => {
                window.addEventListener('hashchange', () => {
                    if (window.location.hash.substr(1).split('/')[0] === '') {
                        this.checkPosts(options);
                        this.posts(options);
                    }
                });
            });
        }
    }

    checkPosts = (options) => {
        if (options.postsElem) {
            options.postsFilled = 0;
            options.currentPost = 0;
            options.postsElem = this.element;
            options.postsElem.insertAdjacentHTML("beforeend", addPosts(options));
            options.moreBtn.style.display = (this.element.children.length === options.dataPosts.length) ? 'none' : 'block';
        }
    }

    posts = (options) => {
        let postsElem = document.getElementById('posts');

        postsElem.insertAdjacentHTML("beforeend", addPosts(options));
        this.changeContentHeight(postsElem.children, options.dataPosts);
        this.addLinks(postsElem.children);
        options.postsElem = postsElem;

        document.querySelector('#filtersForm').addEventListener('submit', (e) => {
            e.preventDefault();

            const posts = document.querySelector('.posts-wrap');
            clearElement(posts);
            posts.appendChild(new PostsPage(options).getElement());

            options.postsElem = postsElem = document.getElementById('posts');
            this.changeContentHeight(options.postsElem.children, options.dataPosts);
            this.addLinks(options.postsElem.children);
        });

        const moreBtn = document.getElementById('moreBtn');
        options.moreBtn = moreBtn;
        moreBtn.addEventListener('click', () => {
            postsElem = document.getElementById('posts');
            postsElem.insertAdjacentHTML("beforeend", addPosts(options));
            this.changeContentHeight(postsElem.children, options.dataPosts);
            this.addLinks(postsElem.children);
            options.moreBtn.style.display = (postsElem.children.length === options.dataPosts.length) ? 'none' : 'block';
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