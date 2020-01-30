import { Post } from '../Common/Post.js'
import { getDataPosts, getDataUsers } from './GetData.js';
import { findUser, findArticleSize } from './Functions.js';

let dataPosts = getDataPosts();
let dataUsers = getDataUsers();

const itemsPerPage = 9;
let postsFilled = 0;
let currentPost = 0;

let sortStyle = (a, b) => {
    return a.stats.views - b.stats.views;
}

function addPosts(sortStyle) {

    dataPosts = dataPosts.sort((a, b) => {
        return a.stats.views - b.stats.views;
    });
    console.log(dataPosts);

    let markup = ``;
    let items = (() => {
        if ((dataPosts.length - postsFilled) >= itemsPerPage) {
            return itemsPerPage;
        } else {
            return dataPosts.length - postsFilled;
        }
    })();

    for (let i = 0; i < items; i++) {
        let currentUser = findUser(dataPosts[currentPost].userId, dataUsers);
        let postSize = findArticleSize(dataPosts[currentPost].article.content);

        markup += new Post({
            size: postSize,
            postId: dataPosts[currentPost].postId,
            imagePost: dataPosts[currentPost].imageUrl,
            imageAvatar: dataUsers[currentUser].avatarUrl,
            name: dataUsers[currentUser].name,
            datePubl: dataPosts[currentPost].date.datePublished,
            timePubl: dataPosts[currentPost].date.timePublished,
            title: dataPosts[currentPost].article.title,
            content: dataPosts[currentPost].article.content,
            views: dataPosts[currentPost].stats.views,
            likes: dataPosts[currentPost].stats.likes
        }).getMarkup();

        currentPost++;
        postsFilled++;
    }
    return markup;
}

export { addPosts }