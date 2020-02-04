import { Component } from '../Core/Component.js';
import { Header } from '../Common/Header.js';
import { Footer } from '../Common/Footer.js';
import { Gallery } from '../Common/Gallery.js';

const renderMarkup = (options) => `
<div class="page-wrap">
    ${
        new Header().getMarkup()
    }
    ${
        new Footer().getMarkup()
    }
</div>
`

export class ReviewsPage extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}