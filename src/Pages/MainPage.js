import { addPosts } from '../Core/AddPosts.js';
import { Component } from '../Core/Component.js';
import { Header } from '../Common/Header.js';
import { Footer } from '../Common/Footer.js';
import { MainPageContent } from '../Common/MainPageContent.js';
import { findArticleSize, findStrEnd } from '../Core/SearchFunctions.js';


const renderMarkup = (options) =>
    `
    <div class="page-wrap">
            ${
                new Header().getMarkup()
            }
            ${
                new MainPageContent().getMarkup()
            }
            ${
                new Footer().getMarkup()
            }
    </div>
`

export class MainPage extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));

        const posts = this.element.querySelector('#posts');
        const moreBtn = this.element.querySelector('#moreBtn');

        window.addEventListener('load', () => {
            posts.insertAdjacentHTML("beforeend", addPosts());
            this.addLinks(posts);
        });

        moreBtn.addEventListener('click', () => {
            posts.insertAdjacentHTML("beforeend", addPosts());
            this.addLinks(posts);
        });
        // posts.addEventListener('transitionend', () => {
        //     this.changeContentHeight(postsAll, fullArticles);
        // });
        // window.addEventListener('resize', () => {
        //     this.changeContentHeight(postsAll, fullArticles);
        // });

    }

    addLinks = (posts) => {
        let postsAll = posts.children;

        for (let i = 0; i < postsAll.length; i++) {
            let postId = postsAll[i].querySelector('.post__link').dataset.id;
            postsAll[i].querySelector('.post__link').addEventListener('click', () => {
                window.location.hash = `#post/${postId}`;
            });
        }
    }

    // changeContentHeight = (posts, articles) => {
    //     for (let i = 0; i < posts.length; i++) {
    //         const contentWrap = posts[i].querySelector('.post__content-wrap');
    //         const content = posts[i].querySelector('.post__content');
    //         content.textContent = articles[i];
    //         while (content.offsetHeight > contentWrap.offsetHeight) {
    //             content.textContent = findStrEnd(content.textContent);
    //         }
    //         posts[i].className = `post post-${findArticleSize(content.textContent)}`;
    //     }
    // }
}