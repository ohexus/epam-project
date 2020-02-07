import { Router } from './Core/Router.js';
import { MainPage } from './Pages/MainPage.js';
import { SinglePost } from './Pages/SinglePost.js';
import { ErrorPage } from './Pages/ErrorPage.js';
import { GalleryPage } from './Pages/GalleryPage.js';
import { GenresPage } from './Pages/GenresPage.js';
import { ConcertsPage } from './Pages/ConcertsPage.js';
import { ReviewsPage } from './Pages/ReviewsPage.js';
import { InterviewsPage } from './Pages/InterviewsPage.js';
import { NewPostPage } from './Pages/NewPostPage.js';

import './Styles/style.scss';
import './Styles/gallery.scss';
import './Styles/newPost.scss';
import './Styles/singlePost.scss';
import './Styles/adaptivity.scss';

const router = new Router({
        default: new MainPage(),
        error: new ErrorPage(),
        post: new SinglePost(),
        genres: new GenresPage(),
        concerts: new ConcertsPage(),
        gallery: new GalleryPage(),
        reviews: new ReviewsPage(),
        interviews: new InterviewsPage(),
        newpost: new NewPostPage()
    },
    document.getElementById('main')
);