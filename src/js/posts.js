const post_struct = `<div class="post">
            <a href="#">
            <img class="post__image"></img>
            <div class="post__description">
                <div class="post__author">
                    <div class="post__author-info">
                        <j class="post__author-avatar"></j>
                        <div class="post__author-name"></div>
                    </div>
                    <div class="post__date">
                        <div class="post__date-published"></div>
                        <div class="post__date-point">·</div>
                        <div class="post__time-published"></div>
                    </div>
                </div>
                <div class="post__article">
                    <h3 class="post__title"></h3>
                    <p class="post__content"></p>
                </div>
            </div>
            <div class="post__footer">
            <hr class="post__hr">
                <div class="post__stats">
                    <div class="post__views">
                        <span class="post__views-number"></span>
                        <span>views</span>
                    </div>
                    <div class="post__likes">
                        <span class="post__likes-number"></span>
                        <span>likes</span>
                    </div>
                </div>
            </div>
            </a>
        </div>`;

window.addEventListener('load', async() => {
    const Url = new URL(location);
    const response = await fetch('../../src/data/posts.json');
    let data = await response.json();

    const itemsPerPage = 9;
    const postsGrid = document.querySelector('.posts');
    const slider = document.getElementById('slider');
    const posts = postsGrid.getElementsByClassName('post');

    data.sort(function(a, b) {
        if (a.stats.views > b.stats.views) {
            return -1;
        }
        if (a.stats.views < b.stats.views) {
            return 1;
        }
        return 0;
    });

    function strEndSearch(str, limit) {
        while (str[limit] != '.') {
            limit--;
            if (limit == -1) {
                return str;
            }
        }
        return str.substr(0, limit);
    }

    function postFill(post, data) {
        const postImage = post.querySelector('.post__image');
        postImage.src = data.imageUrl;

        const dArticle = data.article;
        const articleLength = dArticle.content.length;
        let symbolLimit;
        let articleSize;

        if (!dArticle.content) {
            post.className += ' post-small';
            symbolLimit = 0;
            articleSize = 'small';
        } else {
            if (articleLength < 400) {
                symbolLimit = 150;
                post.className += ' post-medium';
                articleSize = 'medium';
            } else {
                symbolLimit = 400;
                post.className += ' post-big';
                articleSize = 'big';
            }
        }

        const author = post.querySelector('.post__author-name');
        author.textContent = data.author;

        const date = post.querySelector('.post__date');
        const dateP = date.querySelector('.post__date-published');
        const timeP = date.querySelector('.post__time-published');
        dateP.textContent = data.date.datePublished;
        timeP.textContent = data.date.timePublished;

        const article = post.querySelector('.post__article');
        const title = article.querySelector('.post__title');
        const content = article.querySelector('.post__content');
        const contentMediumHeightLimit = 115;
        const contentBigHeightLimit = 320;
        title.textContent = dArticle.title;

        if (articleLength >= symbolLimit) {
            content.textContent = strEndSearch(dArticle.content, symbolLimit);
            content.textContent += '...';
            if (articleSize == 'medium' && content.offsetHeight > contentMediumHeightLimit) {
                symbolLimit--;
                content.textContent = content.textContent.substr(0, content.textContent.length - 3);
                content.textContent = strEndSearch(content.textContent, symbolLimit);
                content.textContent += '...';
            }
            if (articleSize == 'big' && content.offsetHeight > contentBigHeightLimit) {
                symbolLimit--;
                content.textContent = content.textContent.substr(0, content.textContent.length - 3);
                content.textContent = strEndSearch(content.textContent, symbolLimit);
                content.textContent += '...';
            }
        } else {
            content.textContent = dArticle.content;
        }

        const stats = post.querySelector('.post__stats');
        const views = stats.querySelector('.post__views-number');
        const likes = stats.querySelector('.post__likes-number');
        views.textContent = data.stats.views;
        likes.textContent = data.stats.likes;
    }

    function sliderFill(slider, data) {
        const sliderImage = slider.getElementsByClassName('slider__item-image')[sliderCurrent];
        sliderImage.src = data.imageUrl;

        const sliderTitle = slider.getElementsByClassName('item-content__title')[sliderCurrent];
        const sliderContent = slider.getElementsByClassName('item-content__content')[sliderCurrent];
        const sliderSymbolLimit = 500;
        const sliderHeightLimit = 180;

        sliderTitle.textContent = data.article.title;


        if (data.article.content.length > sliderSymbolLimit) {
            sliderContent.textContent = strEndSearch(data.article.content, sliderSymbolLimit);
            sliderContent.textContent += '...';
            if (sliderContent.offsetHeight > sliderHeightLimit) {
                sliderSymbolLimit--;
                sliderContent.textContent = sliderContent.textContent.substr(0, sliderContent.textContent.length - 3);
                sliderContent.textContent = strEndSearch(sliderContent.textContent, sliderSymbolLimit);
                sliderContent.textContent += '...';
            }
        } else {
            sliderContent.textContent = data.article.content;
        }

        sliderCurrent++;
    }

    const slider_limit = slider.getElementsByClassName('slider-dot').length - 1;
    let sliderCurrent = 0;
    let postsFilled = 0;

    function addPosts() {
        if ((data.length - 1 - postsFilled) >= itemsPerPage) {
            for (let i = 0; i < itemsPerPage; i++) {
                postsGrid.insertAdjacentHTML("beforeend", post_struct);
            }
        } else {
            for (let i = 0; i < (data.length - 1 - postsFilled); i++) {
                postsGrid.insertAdjacentHTML("beforeend", post_struct);
            }
        }
        for (postsFilled; postsFilled < posts.length; postsFilled++) {
            postFill(posts[postsFilled], data[postsFilled]);
            if ((data[postsFilled].article.content.length != 0) && (sliderCurrent <= slider_limit)) {
                sliderFill(slider, data[postsFilled]);
            }
        }
    }
    addPosts();
    const btnMore = document.querySelector('.more-btn');
    btnMore.addEventListener('click', addPosts);
});