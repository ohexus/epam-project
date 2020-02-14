import { Component } from '../../Core/Component.js'

const renderMarkup = (options) => `
<a class="posts-start"></a>
`

export class ToPostsStartButton extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}