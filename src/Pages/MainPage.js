import { Component } from '../Core/Component.js';
import { Header } from '../Common/Header.js';
import { Footer } from '../Common/Footer.js';
import { MainPageContent } from '../Common/MainPageContent.js';


const renderMarkup = (options) =>
    `
    <div class="page-wrap">
            ${
                new Header().getMarkup()
            }
            ${
                new MainPageContent().getMarkup()
            }
            ${
                new Footer().getMarkup()
            }
    </div>
`

export class MainPage extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}