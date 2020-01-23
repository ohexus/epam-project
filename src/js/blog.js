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

function postFill(post, dataP, dataU) {
    const aLink = post.querySelector('.post__link');
    aLink.href += `?postId=${dataP.postId}`;

    const postImage = post.querySelector('.post__image');
    postImage.src = dataP.imageUrl;

    const author = post.querySelector('.post__author-name');
    const authorAvatar = post.querySelector('.post__author-avatar');
    for (let i = 0; i < dataU.length; i++) {
        if (dataU[i].userId === dataP.userId) {
            author.textContent = dataU[i].name;
            authorAvatar.src = dataU[i].avatarUrl;
            break;
        }
    }

    const dateP = post.querySelector('.post__date-published');
    const timeP = post.querySelector('.post__time-published');
    dateP.textContent = dataP.date.datePublished;
    timeP.textContent = dataP.date.timePublished;

    const views = post.querySelector('.post__views-number');
    const likes = post.querySelector('.post__likes-number');
    views.textContent = dataP.stats.views;
    likes.textContent = dataP.stats.likes;

    const dArticle = dataP.article;
    const title = post.querySelector('.post__title');
    const content = post.querySelector('.post__content');
    title.textContent = dArticle.title;
    content.textContent = dArticle.content;

    const otherPostElemsHeight = 173;
    post.style.height = `${content.offsetHeight + otherPostElemsHeight}px`;
}

window.addEventListener('load', async() => {
    const responsePosts = await fetch('../../src/data/posts.json');
    let dataPosts = await responsePosts.json();
    const responseUsers = await fetch('../../src/data/users.json');
    let dataUsers = await responseUsers.json();

    const filters = document.querySelector('.filters');
    const filtersSort = filters.querySelector('.filters__sort');
    const sortBtn = filtersSort.querySelector('.filters__sort-btn');

    sortBtn.addEventListener('click', () => {
        const sortMenu = filtersSort.querySelector('.filters__sort-menu');

        if (sortMenu.style.display === 'none' || !sortMenu.style.display) {
            sortMenu.style.display = 'block';
            let sortList = sortMenu.getElementsByClassName('sort-menu__item');

            for (let i = 0; i < sortList.length; i++) {
                const sortItem = sortList[i];
                const sortBy = sortItem.dataset.sort;
                console.log(sortBy);

                sortItem.addEventListener('click', () => {
                    switch (sortBy) {
                        case 'views':
                            console.log('v');
                            break;
                        case 'likes':
                            console.log('l');
                            break;
                        case 'newness':
                            console.log('n');
                            break;
                    }
                });
            }
        } else {
            sortMenu.style.display = 'none'
        }
    });

    const postsGrid = document.querySelector('.posts');
    const posts = postsGrid.getElementsByClassName('post');

    const itemsPerPage = 10;
    let postsFilled = 0;
    let dataCurrentPost = 0;

    const dataOnlyPosts = dataPosts.filter(post => post.article.content.length !== 0);
    console.log(dataOnlyPosts);


    const btnMore = document.querySelector('.more-btn');

    function addPosts() {
        if ((dataOnlyPosts.length - postsFilled) >= itemsPerPage) {
            for (let i = 0; i < itemsPerPage; i++) {
                postsGrid.insertAdjacentHTML("beforeend", post_struct);
            }
        } else {
            for (let i = 0; i < (dataOnlyPosts.length - postsFilled); i++) {
                postsGrid.insertAdjacentHTML("beforeend", post_struct);
            }
        }

        for (postsFilled; postsFilled < posts.length; postsFilled++) {
            postFill(posts[postsFilled], dataOnlyPosts[postsFilled], dataUsers);
        }

        if (dataOnlyPosts.length === posts.length) {
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
            post.style.height = `${content.offsetHeight + 173}px`;
        }
    });
});