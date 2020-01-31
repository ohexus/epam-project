import { Post } from '../Common/Post.js'
import { getDataPosts, getDataUsers } from './GetData.js';
import { findUser, findArticleSize } from './Functions.js';

let dataPosts = getDataPosts();
let dataUsers = getDataUsers();

const itemsPerPage = 3;
let postsFilled = 0;
let currentPost = 0;

function addPosts(options) {
    options.dataPosts = options.dataPosts ? options.dataPosts : getDataPosts();
    options.dataUsers = options.dataUsers ? options.dataUsers : getDataUsers();
    if (!options.postsFilled) options.postsFilled = postsFilled;
    if (!options.currentPost) options.currentPost = currentPost;

    let markup = ``;
    let items = (options.dataPosts.length - options.postsFilled) >= itemsPerPage ? itemsPerPage : (dataPosts.length - options.postsFilled);

    for (let i = 0; i < items; i++) {
        let currentUser = findUser(dataPosts[options.currentPost].userId, dataUsers);
        let postSize = findArticleSize(dataPosts[options.currentPost].article.content);

        markup += new Post({
            size: postSize,
            postId: dataPosts[options.currentPost].postId,
            imagePost: dataPosts[options.currentPost].imageUrl,
            imageAvatar: dataUsers[currentUser].avatarUrl,
            name: dataUsers[currentUser].name,
            datePubl: dataPosts[options.currentPost].date.datePublished,
            timePubl: dataPosts[options.currentPost].date.timePublished,
            title: dataPosts[options.currentPost].article.title,
            content: dataPosts[options.currentPost].article.content,
            views: dataPosts[options.currentPost].stats.views,
            likes: dataPosts[options.currentPost].stats.likes
        }).getMarkup();

        options.currentPost++;
        options.postsFilled++;
    }

    return markup;
}

export { addPosts }