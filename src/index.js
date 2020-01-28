import { Router } from './Core/Router.js';
import { Component } from './Core/Component.js';
import { MainPage } from './Pages/MainPage.js';
import { SinglePost } from './Pages/SinglePost.js';
import { ErrorPage } from './Pages/ErrorPage.js';

import './Styles/style.scss';
import './Styles/singlePost.scss';

const router = new Router({
        default: new MainPage(),
        post: new SinglePost(),
        error: new ErrorPage()
    },
    document.getElementById('main')
);