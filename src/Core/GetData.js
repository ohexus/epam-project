import { dataPosts } from '../Data/posts.json';
import { dataUsers } from '../Data/users.json';
import { dataComments } from '../Data/comments.json';
import { dataSlider } from '../Data/slider.json';
import { dataGallery } from '../Data/gallery.json';

function getDataPosts() {
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