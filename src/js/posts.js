const post_struct = `<div class="post">
            <a href="post.html" class="post__link">
                <img class="post__image"></img>
            </a>
            <div class="post__description">
                <div class="post__info-wrap">
                    <img class="post__author-avatar"></img>
                    <div class="post__info">
                        <div class="post__author-name"></div>
                        <div class="post__date">
                            <div class="post__date-published"></div>
                            <div class="post__date-point">·</div>
                            <div class="post__time-published"></div>
                        </div>
                    </div>
                </div>
                <div class="post__article">
                    <h3 class="post__title"></h3>
                    <div class="post__content-wrap">
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
            </div>
    </div>`;

function strEndSearch(str, limit) {
    while (str[limit] != '.') {
        limit--;
        if (limit < 0) {
            return '';
        }
    }
    return str.slice(0, limit);
}

function findArticleSize(post, article) {
    if (!article) {
        post.className = 'post post-small';
        return 'small';
    } else {
        if (article.length < 400) {
            post.className = 'post post-medium';
            return 'medium';
        } else {
            post.className = 'post post-big';
            return 'big';
        }
    }
}

function limitArticleHeight(cont, article, heightLimit, size, post) {
    if (article.length !== 0) {
        cont.textContent = article;
        if (cont.textContent.length !== 0) {
            cont.textContent = strEndSearch(cont.textContent, cont.textContent.length - 1);
            if (cont.textContent.length !== 0) {
                cont.textContent += '...';
            } else {
                size = 'small';
                post.className = 'post post-small';
                return
            }
        }
        // console.log(`post id: ${id}|size: ${size}|cont.offsetHeight: ${cont.offsetHeight}|heightLimit: ${heightLimit}`);
        if (((size == 'medium') && (cont.offsetHeight > heightLimit)) ||
            ((size == 'big') && (cont.offsetHeight > heightLimit))) {
            cont.textContent = cont.textContent.slice(0, -3);
            limitArticleHeight(cont, cont.textContent, heightLimit, size, post);
        }
    }
}

function postFill(post, dataP, dataU) {
    const aLink = post.querySelector('.post__link');
    aLink.href += `?postId=${dataP.postId}`;

    const postImage = post.querySelector('.post__image');
    postImage.src = dataP.imageUrl;
    const dArticle = dataP.article;

    const author = post.querySelector('.post__author-name');
    const authorAvatar = post.querySelector('.post__author-avatar');
    for (let i = 0; i < dataU.length; i++) {
        if (dataU[i].userId === dataP.userId) {
            author.textContent = dataU[i].name;
            authorAvatar.src = dataU[i].avatarUrl;
            break;
        }
    }

    const date = post.querySelector('.post__date');
    const dateP = date.querySelector('.post__date-published');
    const timeP = date.querySelector('.post__time-published');
    dateP.textContent = dataP.date.datePublished;
    timeP.textContent = dataP.date.timePublished;

    const stats = post.querySelector('.post__stats');
    const views = stats.querySelector('.post__views-number');
    const likes = stats.querySelector('.post__likes-number');
    views.textContent = dataP.stats.views;
    likes.textContent = dataP.stats.likes;

    const article = post.querySelector('.post__article');
    const title = article.querySelector('.post__title');
    const content = article.querySelector('.post__content');
    const articleSize = findArticleSize(post, dArticle.content);
    const contentWrap = article.querySelector('.post__content-wrap');
    const contentHeightLimit = contentWrap.offsetHeight;
    title.textContent = dArticle.title;

    limitArticleHeight(content, dArticle.content, contentHeightLimit, articleSize, post);
}

function sliderFill(slider, dataP, current) {
    const sliderImage = slider.getElementsByClassName('slider__item-image')[current];
    sliderImage.src = dataP.imageUrl;

    const sliderTitle = slider.getElementsByClassName('item-content__title')[current];
    const sliderContent = slider.getElementsByClassName('item-content__content')[current];
    const sliderSymbolLimit = 500;
    const sliderHeightLimitit = 180;

    sliderTitle.textContent = dataP.article.title;

    if (dataP.article.content.length > sliderSymbolLimit) {
        sliderContent.textContent = strEndSearch(dataP.article.content, sliderSymbolLimit);
        sliderContent.textContent += '...';
        if (sliderContent.offsetHeight > sliderHeightLimitit) {
            sliderSymbolLimit--;
            sliderContent.textContent = sliderContent.textContent.substr(0, sliderContent.textContent.length - 3);
            sliderContent.textContent = strEndSearch(sliderContent.textContent, sliderSymbolLimit);
            sliderContent.textContent += '...';
        }
    } else {
        sliderContent.textContent = dataP.article.content;
    }
}

window.addEventListener('load', async() => {
    // const Url = new URL(location);
    const responsePosts = await fetch('../../src/data/posts.json');
    let dataPosts = await responsePosts.json();
    const responseUsers = await fetch('../../src/data/users.json');
    let dataUsers = await responseUsers.json();

    const itemsPerPage = 9;
    const postsGrid = document.querySelector('.posts');
    const slider = document.getElementById('slider');
    const posts = postsGrid.getElementsByClassName('post');

    dataPosts.sort(function(a, b) {
        if (a.stats.views > b.stats.views) {
            return -1;
        }
        if (a.stats.views < b.stats.views) {
            return 1;
        }
        return 0;
    });

    const slider_limit = slider.getElementsByClassName('slider-dot').length;
    let sliderCurrent = 0;
    let postsFilled = 0;


    const btnMore = document.querySelector('.more-btn');

    function addPosts() {
        if ((dataPosts.length - postsFilled) >= itemsPerPage) {
            for (let i = 0; i < itemsPerPage; i++) {
                postsGrid.insertAdjacentHTML("beforeend", post_struct);
            }
        } else {
            for (let i = 0; i < (dataPosts.length - postsFilled); i++) {
                postsGrid.insertAdjacentHTML("beforeend", post_struct);
            }
        }

        for (postsFilled; postsFilled < posts.length; postsFilled++) {
            postFill(posts[postsFilled], dataPosts[postsFilled], dataUsers);

            if ((dataPosts[postsFilled].article.content.length != 0) && (sliderCurrent < slider_limit)) {
                sliderFill(slider, dataPosts[postsFilled], sliderCurrent);
                sliderCurrent++;
            }
        }

        if (dataPosts.length === posts.length) {
            btnMore.style.display = 'none';
        }
    }

    addPosts();
    btnMore.addEventListener('click', addPosts);

    window.addEventListener('resize', () => {
        console.log('resized');
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            const content = post.querySelector('.post__content');
            const dArticle = dataPosts[i].article;
            const articleSize = findArticleSize(post, dArticle.content);
            const contentHeightLimit = post.querySelector('.post__content-wrap').offsetHeight;
            limitArticleHeight(content, dArticle.content, contentHeightLimit, articleSize, post);
        }
    });
});