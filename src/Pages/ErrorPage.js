import { Component } from '../Core/Component.js';
import { Header } from '../Common/Header/Header.js';
import { Footer } from '../Common/Footer/Footer.js';
import { Error } from '../Common/Error/Error.js';

const renderMarkup = (options) =>
    `
            ${
                new Error().getMarkup()
            }
`

export class ErrorPage extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}