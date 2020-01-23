const comment_struct = `<div class="comments__comment">
    <div class="comment__info">
        <div class="comment__author">
            <img class="comment__author-avatar"></img>
            <div class="comment__author-name"></div>
        </div>
        <div class="comment__date">
            <div class="comment__date-published"></div>
            <div class="comment__date-point">·</div>
            <div class="comment__time-published"></div>
        </div>
    </div>
    <div class="comment__content"></div>
</div>`;

function findUser(dataU, dataTarget) {
    for (let i = 0; i < dataU.length; i++) {
        if (dataU[i].userId === dataTarget.userId) {
            return i;
        }
    }
}

function commentsFill(comment, dataC, dataU) {
    const commentAuthor = comment.querySelector('.comment__author-name');
    const commentAuthorAvatar = comment.querySelector('.comment__author-avatar');
    const commentDate = comment.querySelector('.comment__date-published');
    const commentTime = comment.querySelector('.comment__time-published');
    const commentContent = comment.querySelector('.comment__content');
    currentUser = findUser(dataU, dataC);

    commentAuthor.textContent = dataU[currentUser].name;
    commentAuthorAvatar.src = dataU[currentUser].avatarUrl;
    commentDate.textContent = dataC.date.datePublished;
    commentTime.textContent = dataC.date.timePublished;
    commentContent.textContent = dataC.comment;
}

window.addEventListener('load', async() => {
    const Url = new URL(location);
    const pId = parseInt(Url.searchParams.get('postId'));
    console.log(`postId: ${pId}`);
    const response = await fetch('../../src/data/posts.json');
    let dataPosts = await response.json();
    const responseUsers = await fetch('../../src/data/users.json');
    let dataUsers = await responseUsers.json();
    const responseComments = await fetch('../../src/data/comments.json');
    let dataComments = await responseComments.json();

    for (let i = 0; i < dataPosts.length; i++) {
        if (dataPosts[i].postId === pId) {
            dataPosts = dataPosts[i];
            break;
        }
    }

    const post = document.querySelector('.post');
    const postImage = post.querySelector('.post__image');
    postImage.src = dataPosts.imageUrl;

    let currentUser = findUser(dataUsers, dataPosts);

    const author = post.querySelector('.post__author-name');
    const authorAvatar = post.querySelector('.post__author-avatar');
    author.textContent = dataUsers[currentUser].name;
    authorAvatar.src = dataUsers[currentUser].avatarUrl;

    const date = post.querySelector('.post__date');
    const dateP = date.querySelector('.post__date-published');
    const timeP = date.querySelector('.post__time-published');
    dateP.textContent = dataPosts.date.datePublished;
    timeP.textContent = dataPosts.date.timePublished;

    const dArticle = dataPosts.article;
    const article = post.querySelector('.post__article');
    const title = article.querySelector('.post__title');
    const content = article.querySelector('.post__content');
    title.textContent = dArticle.title;
    content.textContent = dArticle.content;

    const stats = post.querySelector('.post__stats');
    const views = stats.querySelector('.post__views-number');
    const likes = stats.querySelector('.post__likes-number');
    views.textContent = dataPosts.stats.views;
    likes.textContent = dataPosts.stats.likes;

    const commentsEl = document.querySelector('.comments');
    const commentsAmount = document.querySelector('.comments__amount-number');

    for (let i = 0; i < dataComments.length; i++) {
        if (dataComments[i].postId === dataPosts.postId) {
            dataComments = dataComments[i].comments;
            commentsAmount.textContent = dataComments.length;
            console.log(`dataComments.length: ${dataComments.length}`);
            for (let i = 0; i < dataComments.length; i++) {
                if ((dataComments.length - 1) !== 0) {
                    commentsEl.insertAdjacentHTML("beforeend", comment_struct);
                }
            }
            break;
        }
    }

    const comments = commentsEl.getElementsByClassName('comments__comment');
    for (let i = 0; i < comments.length; i++) {
        commentsFill(comments[i], dataComments[i], dataUsers);
    }
});