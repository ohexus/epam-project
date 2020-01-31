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
    let items = (options.dataPosts.length - options.postsFilled) >= itemsPerPage ? itemsPerPage : (options.dataPosts.length - options.postsFilled);

    for (let i = 0; i < items; i++) {
        let currentPost = options.currentPost;
        let currentUser = findUser(options.dataPosts[currentPost].userId, dataUsers);
        let postSize = findArticleSize(options.dataPosts[currentPost].article.content);

        markup += new Post({
            size: postSize,
            postId: options.dataPosts[currentPost].postId,
            imagePost: options.dataPosts[currentPost].imageUrl,
            imageAvatar: options.dataUsers[currentUser].avatarUrl,
            login: options.dataUsers[currentUser].login,
            datePubl: options.dataPosts[currentPost].date.datePublished,
            timePubl: options.dataPosts[currentPost].date.timePublished,
            title: options.dataPosts[currentPost].article.title,
            content: options.dataPosts[currentPost].article.content,
            views: options.dataPosts[currentPost].stats.views,
            likes: options.dataPosts[currentPost].stats.likes
        }).getMarkup();

        options.currentPost++;
        options.postsFilled++;
    }

    return markup;
}

export { addPosts }