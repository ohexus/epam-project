import { Router } from './Core/Router.js';
import { Component } from './Core/Component.js';
import { MainPage } from './Pages/MainPage.js';
import './Styles/style.scss';

const router = new Router({
        default: new MainPage()
    },
    document.getElementById('main')
);