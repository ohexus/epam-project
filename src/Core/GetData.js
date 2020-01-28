import { dataPosts } from '../Data/posts.json';
import { dataUsers } from '../Data/users.json';
import { dataComments } from '../Data/comments.json';

function getDataPosts() {
    return dataPosts;
}

function getDataUsers() {
    return dataUsers;
}

function getDataComments() {
    return dataComments;
}

export { getDataPosts, getDataUsers, getDataComments }