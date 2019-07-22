import {LitElement, html} from '/web_modules/lit-element.js'
// import {LitElement, html} from 'https://unpkg.com/lit-element@2.2.0/lit-element.js'
// import {unsafeHTML} from 'https://unpkg.com/lit-html@1.1.1/directives/unsafe-html.js'
import {getArticle} from './api.js'
import {unsafeHTML} from './common.js'
import markdown from './markdown.js'


class Article extends LitElement {
    static get properties() {
        return {
            content: {type: String},
        }
    }

    constructor() {
        super()
        this.content = 'loading...'
        if(article_id) {
            this.getContent(article_id)
        }
    }

    async getContent(id) {
        let article = await getArticle(id)
        this.content = article.content
    }

    render() {
        return html`
            <link rel="stylesheet" href="//cdn.bootcss.com/KaTeX/0.10.2/katex.min.css">
            <h1>hello</h1>
            <div id="content">${unsafeHTML(markdown(this.content))}</div>
        `
    }
}

customElements.define('my-element', Article)




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
