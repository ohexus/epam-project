import { Component } from '../Core/Component.js';
import { Header } from '../Common/Header/Header.js';
import { Footer } from '../Common/Footer/Footer.js';
import { MainPageContent } from '../Common/Posts/MainPageContent.js';
import { getDataPosts, getDataUsers } from '../Core/GetData.js';
import { Slider } from '../Common/Slider/Slider.js';


const renderMarkup = (options) => `
    <div class="page-wrap">
            ${
                new Header().getMarkup()
            }
            ${
                new Slider().getMarkup()
            }
            ${
                new MainPageContent(options).getMarkup()
            }
            ${
                new Footer().getMarkup()
            }
    </div>
`

export class MainPage extends Component {
    constructor(options = {}) {
        options.dataPosts = getDataPosts();
        super(options, renderMarkup(options));
    }
}