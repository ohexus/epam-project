import { Post } from '../Common/Post.js'
import { getDataPosts, getDataUsers } from './GetData.js';
import { findUser, findArticleSize } from './SearchFunctions.js';

// function sliderFill(slider, dataP, current) {
//     const sliderImage = slider.getElementsByClassName('slider__item-image')[current];
//     sliderImage.src = dataP.imageUrl;

//     const sliderTitle = slider.getElementsByClassName('item-content__title')[current];
//     const sliderContent = slider.getElementsByClassName('item-content__content')[current];
//     const sliderSymbolLimit = 500;
//     const sliderHeightLimit = 180;

//     sliderTitle.textContent = dataP.article.title;

//     if (dataP.article.content.length > sliderSymbolLimit) {
//         sliderContent.textContent = strEndSearch(dataP.article.content, sliderSymbolLimit);
//         sliderContent.textContent += '...';
//         if (sliderContent.offsetHeight > sliderHeightLimit) {
//             sliderSymbolLimit--;
//             sliderContent.textContent = sliderContent.textContent.substr(0, sliderContent.textContent.length - 3);
//             sliderContent.textContent = strEndSearch(sliderContent.textContent, sliderSymbolLimit);
//             sliderContent.textContent += '...';
//         }
//     } else {
//         sliderContent.textContent = dataP.article.content;
//     }
// }
let dataPosts = getDataPosts();
let dataUsers = getDataUsers();

const itemsPerPage = 9;
let postsFilled = 0;
let currentPost = 0;

function addPosts() {
    let markup = ``;
    let items = (() => {
        if ((dataPosts.length - postsFilled) >= itemsPerPage) {
            return itemsPerPage;
        } else {
            return dataPosts.length - postsFilled;
        }
    })();

    for (let i = 0; i < items; i++) {
        let currentUser = findUser(dataUsers, dataPosts[currentPost]);
        let postSize = findArticleSize(dataPosts[currentPost].article.content);

        markup += new Post({
            size: postSize,
            postId: dataPosts[currentPost].postId,
            imagePost: dataPosts[currentPost].imageUrl,
            imageAvatar: dataUsers[currentUser].avatarUrl,
            authorName: dataUsers[currentUser].name,
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