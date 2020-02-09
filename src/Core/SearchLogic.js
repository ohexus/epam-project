import { getDataPosts, getDataUsers } from "./GetData";
import { clearElement, findUser } from "./Functions";
import { SearchItem } from "../Common/Header/SearchItem";

let dataPosts = getDataPosts();
let dataUsers = getDataUsers();

let searchLogic = (options) => {
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
            postsList.insertAdjacentHTML('beforeend', new SearchItem(options = {
                link: `#post/${item.postId}`,
                img: item.imageUrl,
                context: item.article.title
            }).getMarkup());
        });

        const usersList = document.querySelector('.search__users-list');
        clearElement(usersList);
        filteredUsers.forEach((item) => {
            usersList.insertAdjacentHTML('beforeend', new SearchItem(options = {
                link: `#user/${item.userId}`,
                img: item.avatarUrl,
                context: item.login
            }).getMarkup());
        });
        styleIn();
    } else {
        styleOut();
    }
}

function styleIn() {
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
}

export function searchWatch() {
    document.getElementById('searchInput').addEventListener('keyup', searchLogic);
    document.getElementById('searchCancel').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        styleOut();
    });
    document.getElementById('searchForm').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('SUBMIT');
    });
}