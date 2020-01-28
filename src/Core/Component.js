export class Component {

    constructor(options, markup) {
        this.options = options || {};
        this.markup = markup;
        this.element = this.convertToDOM(markup);
    }

    getOptions = () => {
        return this.options;
    }

    getMarkup = () => {
        return this.markup;
    }

    getElement = () => {
        return this.element;
    }

    convertToDOM = (stringHTML) => {
        let el = document.createElement('div');
        el.innerHTML = stringHTML;
        return el.firstElementChild;
    }

}