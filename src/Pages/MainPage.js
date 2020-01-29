import { addPosts } from '../Core/AddPosts.js';
import { Component } from '../Core/Component.js';
import { Header } from '../Common/Header.js';
import { Footer } from '../Common/Footer.js';
import { MainPageContent } from '../Common/MainPageContent.js';
import { findArticleSize, findStrEnd } from '../Core/SearchFunctions.js';
import { getDataPosts } from '../Core/GetData.js';
import { Slider } from '../Common/Slider.js';


const renderMarkup = (options) =>
    `
    <div class="page-wrap">
            ${
                new Header().getMarkup()
            }
            ${
                new Slider().getMarkup()
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

        let dataPosts = getDataPosts();
        const postsElem = this.element.querySelector('#posts');
        const moreBtn = this.element.querySelector('#moreBtn');
        const postsAll = postsElem.children;

        window.addEventListener('load', () => {
            postsElem.insertAdjacentHTML("beforeend", addPosts());
            this.changeContentHeight(postsAll, dataPosts);
            this.addLinks(postsAll);
        });
        window.addEventListener('resize', () => {
            this.changeContentHeight(postsAll, dataPosts);
        });
        moreBtn.addEventListener('click', () => {
            postsElem.insertAdjacentHTML("beforeend", addPosts());
            this.changeContentHeight(postsAll, dataPosts);
            this.addLinks(postsAll);
            if (postsAll.length === dataPosts.length) {
                moreBtn.style.display = 'none';
            }
        });
    }

    addLinks = (postsAll) => {
        for (let i = 0; i < postsAll.length; i++) {
            let postId = postsAll[i].querySelector('.post__link').dataset.id;
            postsAll[i].querySelector('.post__link').addEventListener('click', () => {
                window.location.hash = `#post/${postId}`;
            });
        }
    }

    changeContentHeight = (posts, articles) => {
        for (let i = 0; i < posts.length; i++) {
            const contentWrap = posts[i].querySelector('.post__content-wrap');
            const content = posts[i].querySelector('.post__content');
            // console.log(`article: ${articles[i].article.content}`);
            content.textContent = articles[i].article.content;
            while (content.offsetHeight > contentWrap.offsetHeight) {
                content.textContent = findStrEnd(content.textContent);
            }
        }
    }
}