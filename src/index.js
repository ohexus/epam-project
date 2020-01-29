import { Router } from './Core/Router.js';
import { Component } from './Core/Component.js';
import { MainPage } from './Pages/MainPage.js';
import { SinglePost } from './Pages/SinglePost.js';
import { ErrorPage } from './Pages/ErrorPage.js';
import { GalleryPage } from './Pages/GalleryPage.js';

import './Styles/style.scss';
import './Styles/singlePost.scss';
import './Styles/gallery.scss';

const router = new Router({
        default: new MainPage(),
        post: new SinglePost(),
        error: new ErrorPage(),
        gallery: new GalleryPage()
    },
    document.getElementById('main')
);