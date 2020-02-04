import { Component } from '../Core/Component.js';
import { Header } from '../Common/Header.js';
import { Footer } from '../Common/Footer.js';
import { NewPost } from '../Common/NewPost.js';
import { findUserByLogin } from '../Core/Functions.js';
import { getDataUsers, getDataPosts } from '../Core/GetData.js';

const renderMarkup = (options) => `
<div class="page-wrap">
    ${
        new Header().getMarkup()
    }
    <div class="new-post-wrap"></div>
    ${
        new Footer().getMarkup()
    }
</div>
`

export class NewPostPage extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));

        options.countListeners = 0;
        window.addEventListener('load', () => {
            window.addEventListener('hashchange', () => {
                if (window.location.hash.substr(1) === 'newpost') {
                    let activeUser = localStorage.getItem('activeUser');
                    let dataUsers = getDataUsers();
                    let currentUser = findUserByLogin(activeUser, dataUsers);
                    if (document.querySelector('.new-post')) document.querySelector('.new-post').remove();
                    document.querySelector('.new-post-wrap').insertAdjacentHTML('afterbegin', new NewPost().getMarkup());

                    if (options.countListeners === 0) {
                        this.addListeners(dataUsers[currentUser].userId);
                        options.countListeners++;
                    }
                }
            });
        });
    }

    addListeners = (userId) => {
        const newPostTitle = document.querySelector('#newPostTitle');
        const newPostContent = document.querySelector('#newPostContent');
        const filterTopic = document.querySelector('#filterTopic');
        const filterGenre = document.querySelector('#filterGenre');
        const imageUploadBtn = document.querySelector('#imageUploadBtn');
        const previewImage = document.querySelector('#previewImage');
        const submitBtn = document.querySelector('#newPostSubmit');

        imageUploadBtn.addEventListener('change', () => {
            let reader = new FileReader();
            reader.addEventListener('load', () => {
                previewImage.src = reader.result;
            });
            reader.readAsDataURL(imageUploadBtn.files[0]);
        });

        submitBtn.addEventListener('click', (e) => {
            console.log('click');
            e.preventDefault();

            if (newPostTitle.value === '' ||
                filterTopic.value === 'all' ||
                filterGenre.value === 'all' ||
                previewImage.src === '') {
                document.querySelector('.new-post__alert').style.bottom = '15px';
                document.querySelector('.new-post__alert').style.opacity = '1';
                setTimeout(() => {
                    document.querySelector('.new-post__alert').style.bottom = '-100%';
                    document.querySelector('.new-post__alert').style.opacity = '0';
                }, 2750);
            } else {
                let options = {
                    userId: userId,
                    newPostTitle: newPostTitle.value,
                    newPostContent: newPostContent.textContent,
                    filterTopic: filterTopic.value,
                    filterGenre: filterGenre.value,
                    imageUrl: previewImage.src
                }
                this.addNewPost(options);
            }
        });
    }

    addNewPost = (options) => {
        let newDate = new Date();
        let day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : `${newDate.getDate()}`;
        let month = (newDate.getMonth() + 1) < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;

        let post = {
            "postId": Math.round((Math.random() * 1000)),
            "userId": options.userId,
            "topic": options.filterTopic,
            "genre": options.filterGenre,
            "date": {
                "datePublished": `${day}.${month}.${newDate.getFullYear()}`,
                "timePublished": `${newDate.getHours()}:${newDate.getMinutes()}`
            },
            "article": {
                "title": `${options.newPostTitle}`,
                "content": `${options.newPostContent}`
            },
            "stats": {
                "views": 0,
                "likes": 0
            },
            "imageUrl": options.imageUrl
        };
        console.log(post);

        let newPosts = [];
        if (localStorage.getItem('newPosts')) {
            let localPosts = JSON.parse(localStorage.getItem('newPosts'));
            for (let i = 0; i < localPosts.length; i++) {
                newPosts.push(localPosts[i]);
            }
        }
        newPosts.push(post);
        localStorage.setItem('newPosts', JSON.stringify(newPosts));

        window.location.hash = '';
    }
}