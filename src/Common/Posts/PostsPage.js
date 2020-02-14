import { Component } from '../../Core/Component.js';
import { addPosts } from '../../Core/AddPosts.js';
import { findStrEnd, clearElement } from '../../Core/Functions.js';
import { NewPostButton } from './NewPostButton.js';
import { ToPostsStartButton } from './ToPostsStartButton.js';

const renderMarkup = (options) => `
<div class="posts" id="posts"></div>
${
    new ToPostsStartButton().getMarkup()
}
${
    new NewPostButton().getMarkup()
}
`

export class PostsPage extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
        options.countListeners = 0;
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

    posts = (options) => {
        const postsElem = document.getElementById('posts');
        postsElem.insertAdjacentHTML("beforeend", addPosts(options));
        this.changeContentHeight(postsElem.children, options.dataPosts);
        options.postsElem = postsElem;

        this.actionsButtons();

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
            this.actionsButtons();

            this.addCheckPosts(options);
        });
        window.addEventListener('resize', () =>
            this.changeContentHeight(postsElem.children, options.dataPosts)
        );
    }

    actionsButtons = () => {
        document.querySelector('.new-post-btn').style.display = 'flex';
        document.querySelector('.new-post-btn').addEventListener('click', () =>
            window.location.hash = '#newpost'
        );
        document.querySelector('.posts-start').addEventListener('click', () =>
            document.querySelector('.filters').scrollIntoView()
        );
    }

    addCheckPosts = (options) => {
        let postsElem = document.getElementById('posts');
        postsElem.insertAdjacentHTML("beforeend", addPosts(options));
        for (let i = 0; i < postsElem.children.length; i++) {
            postsElem.children[i].style.margin = '100% 0 0';
            postsElem.children[i].style.transition = '0.5s';
            postsElem.children[i].style.opacity = '0';
            setTimeout(() => {
                postsElem.children[i].style.margin = '0';
                postsElem.children[i].style.opacity = '1';
                setTimeout(() => {
                    postsElem.children[i].style.transition = '0.15s';
                }, 500);
            }, 0);
        }
        this.changeContentHeight(postsElem.children, options.dataPosts);
        moreBtn.style.display = (postsElem.children.length === options.dataPosts.length) ? 'none' : 'block';
    }

    changeContentHeight = (posts, articles) => {
        for (let i = 0; i < posts.length; i++) {
            const articleElem = posts[i].querySelector('.post__article');
            const title = posts[i].querySelector('.post__title');
            const titleMargin = parseInt(window.getComputedStyle(title, null).getPropertyValue("margin-bottom"));
            const contentWrap = posts[i].querySelector('.post__content-wrap');
            const content = posts[i].querySelector('.post__content');
            contentWrap.style.height = `${(articleElem.offsetHeight - title.offsetHeight - titleMargin)}px`;
            content.textContent = articles[i].article.content;
            while (content.offsetHeight > contentWrap.offsetHeight) {
                content.textContent = findStrEnd(content.textContent);
            }
        }
    }
}