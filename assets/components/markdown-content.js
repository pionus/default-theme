import {LitElement, html, css} from '/web_modules/lit-element.js'
import {unsafeHTML} from '../common.js'
import markdown from '../markdown.js'


export default class MarkdownContent extends LitElement {
    static get properties() {
        return {
            content: {type: String},
        }
    }

    static get styles() {
        return css`
            :host{}
        `
    }

    constructor() {
        super()
    }

    render() {
        return html`
            <link rel="stylesheet" href="//cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css">
            <link rel="stylesheet" href="//cdn.bootcss.com/KaTeX/0.10.2/katex.min.css">
            <div class="content">${unsafeHTML(markdown(this.content))}</div>
        `
    }
}

customElements.define('markdown-content', MarkdownContent)




// if(article_id) {
//
// } else {
//     // get list
//     graphql({
//         query: '{ list {id content} }',
//     }).then(data => {
//         console.log(data)
//     })
//     console.log("no article")
// }
