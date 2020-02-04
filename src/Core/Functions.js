function findUser(id, dataU) {
    for (let i = 0; i < dataU.length; i++) {
        if (dataU[i].userId === id) {
            return i;
        }
    }
}

function findUserByLogin(login, data) {
    for (let i = 0; i < data.length; i++) {
        if (login.toLowerCase() === data[i].login.toLowerCase()) {
            return i
        }
    }
    return false
}

function findArticleSize(article) {
    if (!article) {
        return 'small';
    } else {
        if (article.length < 400) {
            return 'medium';
        } else {
            return 'big';
        }
    }
}

function findStrEnd(str) {
    let arr = str.substring(0, str.length - 1).split('.');
    arr.pop();
    str = arr.join('.');
    if (!str) {
        return str
    } else {
        return str + '.'
    }
}

function findCurrentPost(id, data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].postId === id) {
            return i;
        }
    }
    return null;
}

function clearElement(e) {
    while (e.firstChild) {
        e.removeChild(e.firstChild);
    }
}

export { findUser, findUserByLogin, findArticleSize, findStrEnd, findCurrentPost, clearElement }