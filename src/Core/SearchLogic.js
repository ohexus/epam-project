import { getDataPosts, getDataUsers } from "./GetData";
import { clearElement, findUser } from "./Functions";
import { SearchItem } from "../Common/Header/SearchItem";

function styleIn() {
    const resultsWrap = document.querySelector('.search__results-wrap');
    resultsWrap.style.height = 'auto';

    const results = document.getElementsByClassName('search__results');
    for (let i = 0; i < results.length; i++) {
        results[i].style.width = '50%';
    }
    if (document.querySelector('.search__posts-list').children.length === 0) {
        results[0].style.width = '0';
    }
    if (document.querySelector('.search__users-list').children.length === 0) {
        results[1].style.width = '0';
    }
}

function styleOut() {
    clearElement(document.querySelector('.search__posts-list'));
    clearElement(document.querySelector('.search__users-list'));
    const results = document.getElementsByClassName('search__results');
    for (let i = 0; i < results.length; i++) {
        results[i].style.width = '0';
    }
    setTimeout(() => {
        const resultsWrap = document.querySelector('.search__results-wrap');
        resultsWrap.style.height = '0';
    }, 150);
}

let dataPosts = getDataPosts();
let dataUsers = getDataUsers();

function searchLogic() {
    let value = document.getElementById('searchInput').value;
    if (value !== '') {
        let filteredPosts = dataPosts.filter(item =>
            JSON.stringify(item.article).match(new RegExp(`${value}`, `gi`)) ||
            JSON.stringify(dataUsers[findUser(item.userId, dataUsers)].login).match(new RegExp(`${value}`, `gi`))
        );
        let filteredUsers = dataUsers.filter(item => JSON.stringify(item.login).match(new RegExp(`${value}`, `gi`)));

        const postsList = document.querySelector('.search__posts-list');
        clearElement(postsList);
        filteredPosts.forEach((item) => {
            postsList.insertAdjacentHTML('beforeend', new SearchItem({
                link: `#post/${item.postId}`,
                imageStyle: `image`,
                imageUrl: item.imageUrl,
                info: item.article.title,
                context: item.article.content
            }).getMarkup());
        });

        const usersList = document.querySelector('.search__users-list');
        clearElement(usersList);
        filteredUsers.forEach((item) => {
            usersList.insertAdjacentHTML('beforeend', new SearchItem({
                link: `#user/${item.userId}`,
                imageStyle: `avatar`,
                imageUrl: (item.avatarUrl === 'default') ? require('../Images/user-icon.svg') : item.avatarUrl,
                info: item.login,
                context: `click to see this user's page`
            }).getMarkup());
        });
        styleIn();
    } else {
        styleOut();
    }
}

function searchCancel() {
    document.getElementById('searchInput').value = '';
    styleOut();
}

export function searchWatch() {
    document.getElementById('searchInput').addEventListener('keyup', searchLogic);
    document.getElementById('searchCancel').addEventListener('click', searchCancel);
    document.getElementById('searchForm').addEventListener('submit', (e) => {
        e.preventDefault();
    });
}