import { Component } from '../Core/Component.js';
import { Header } from '../Common/Header.js';
import { Footer } from '../Common/Footer.js';
import { MainPageContent } from '../Common/MainPageContent.js';
import { getDataPosts, getDataUsers } from '../Core/GetData.js';
import { Slider } from '../Common/Slider.js';


const renderMarkup = (options) => `
    <div class="page-wrap">
            ${
                new Header().getMarkup()
            }
            ${
                new Slider().getMarkup()
            }
            ${
                options.MainPageCont.getMarkup()
            }
            ${
                new Footer().getMarkup()
            }
    </div>
`

export class MainPage extends Component {



    constructor(options = {}) {
        const MainPageCont = new MainPageContent(options);
        options.MainPageCont = MainPageCont;
        options.dataPosts = getDataPosts();
        super(options, renderMarkup(options));
    }
}