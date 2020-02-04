import { dataPosts } from '../Data/posts.json';
import { dataUsers } from '../Data/users.json';
import { dataComments } from '../Data/comments.json';
import { dataSlider } from '../Data/slider.json';
import { dataGallery } from '../Data/gallery.json';

function getDataPosts() {
    if (localStorage.getItem('newPosts')) {
        let newPosts = JSON.parse(localStorage.getItem('newPosts'));
        for (let i = 0; i < newPosts.length; i++) {
            let status = true;
            for (let j = 0; j < dataPosts.length; j++) {
                if (dataPosts[j].postId === newPosts[i].postId) {
                    status = false;
                }
            }
            if (status) dataPosts.push(newPosts[i]);
        }
    }

    return dataPosts;
}

function getDataUsers() {
    return dataUsers;
}

function getDataComments() {
    return dataComments;
}

function getDataSlider() {
    return dataSlider;
}

function getDataGallery() {
    return dataGallery;
}

export { getDataPosts, getDataUsers, getDataComments, getDataSlider, getDataGallery }