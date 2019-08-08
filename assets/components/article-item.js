import {LitElement, html, css} from '/web_modules/lit-element.js'
// import {LitElement, html} from 'https://unpkg.com/lit-element@2.2.0/lit-element.js'
// import {unsafeHTML} from 'https://unpkg.com/lit-html@1.1.1/directives/unsafe-html.js'
import {getArticle, getList} from '../api.js'
import './markdown-content.js'


export default class ArticleItem extends LitElement {
    static get properties() {
        return {
            pid: {
                type: String,
                attribute: 'post-id',
            },
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
        this.content = 'loading...'
    }

    firstUpdated(changedProperties) {
        this.getContent(this.pid)
    }

    async getContent(id) {
        let article = await getArticle(id)
        this.content = article.content
    }

    render() {
        return html`
            <markdown-content content=${this.content} />
        `
    }
}

customElements.define('article-item', ArticleItem)




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
