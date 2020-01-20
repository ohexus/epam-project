const post_struct = `<div class="post">
            <div class="post__image"></div>
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
                <hr class="post__article-hr">
                <div class="post__footer">
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

window.addEventListener('load', async() => {
    const Url = new URL(location);
    const response = await fetch('../../src/data/posts.json');
    let data = await response.json();
    console.log(data);

    const pageId = +Url.searchParams.get('page') || 0;
    console.log(`pageId: ${pageId}`);
    const itemsAmount = data.length;
    const itemsPerPage = 9;

    const postsGrid = document.querySelector('.posts');
    for (let i = 0; i < itemsPerPage; i++) {
        postsGrid.insertAdjacentHTML("beforeend", post_struct);
    }

    const pageIdFirst = 0;
    const pageIdLast = Math.ceil(itemsAmount / itemsPerPage);
    const pageIdNext = Math.min(pageId + 1, pageIdLast);
    const pageIdPrev = Math.max(pageIdFirst, pageId - 1);

    // const variance = 2;
    // const pages = [...Array(2 * variance + 1)]
    //     .map((item, index) => index - variance + pageId)
    //     .filter(item => pageIdFirst <= item && item <= pageIdLast);
    // let result = [];
    // if (pageIdFirst < pageId) {
    //     result.push({ id: pageIdFirst, text: '', first: true });
    // }
    // if (pageIdFirst + 1 < pageId) {
    //     result.push({ id: pageIdPrev, text: '', prev: true });
    // }
    // result.push(...pages.map(item => ({ id: item, text: `${ item + 1 }`, current: item === pageId })));
    // if (pageId < pageIdLast - 1) {
    //     result.push({ id: pageIdNext, text: '', next: true });
    // }
    // if (pageId < pageIdLast) {
    //     result.push({ id: pageIdLast, text: '', last: true });
    // }
    // result = result.map(item => {
    //     const url = new URL(location);
    //     url.searchParams.set('page', item.id);
    //     url.searchParams.set('pageX', item.id);
    //     url.searchParams.set('pageY', item.id);
    //     url.searchParams.set('pageZ', item.id);
    //     return {...item, url: String(url) };
    // });
    // console.log(result);

    function strEndSearch(str, limit) {
        while (str[limit] != '.') {
            limit--;
            if (limit == -1) {
                return str;
            }
        }
        return str.substr(0, limit);
    }

    const posts = postsGrid.getElementsByClassName('post');
    for (let j = 0; j < posts.length; j++) {
        const author = posts[j].querySelector('.post__author-name');
        author.textContent = data[j].author;

        const date = posts[j].querySelector('.post__date');
        const date_p = date.querySelector('.post__date-published');
        const time_p = date.querySelector('.post__time-published');
        date_p.textContent = data[j].date.date_published;
        time_p.textContent = data[j].date.time_published;

        const article = posts[j].querySelector('.post__article');
        const title = article.querySelector('.post__title');
        const content = article.querySelector('.post__content');
        const r_article = data[j].article;
        const symbol_limit = 150;

        title.textContent = r_article.title;
        if (r_article.content.length > symbol_limit) {
            content.textContent = strEndSearch(r_article.content, symbol_limit);
            content.textContent += '...';
        } else {
            content.textContent = r_article.content;
        }

        let stats = posts[j].querySelector('.post__stats');
        let views = stats.querySelector('.post__views-number');
        let likes = stats.querySelector('.post__likes-number');
        views.textContent = data[j].stats.views;
        likes.textContent = data[j].stats.likes;
    }

    // data.sort(function(a, b) {
    //     if (a.stats.views > b.stats.views) {
    //         return 1;
    //     }
    //     if (a.stats.views < b.stats.views) {
    //         return -1;
    //     }
    //     return 0;
    // });
    // console.log(data);

    const slider = document.getElementById('slider');
    const slider_limit = 4;
    for (let j = 0; j <= slider_limit; j++) {
        let slider_title = slider.getElementsByClassName('item-content__title')[j];
        let slider_content = slider.getElementsByClassName('item-content__content')[j];
        let slider_symbol_limit = 300;

        slider_title.textContent = data[j].article.title;

        if (data[j].article.content.length > slider_symbol_limit) {
            slider_content.textContent = strEndSearch(data[j].article.content, slider_symbol_limit);
            slider_content.textContent += '...';
        } else {
            slider_content.textContent = data[j].article.content;
        }
    }
});