import {LitElement, html, css} from '/web_modules/lit-element.js'
import './markdown-content.js'


export default class ArticleItem extends LitElement {
    static get properties() {
        return {
            content: {type: String},
            title: {type: String},
            author: {type: String},
            createdAt: {type: String},
        }
    }

    static get styles() {
        return css`
            :host{
                display: block;
            }
            .article-header{
                margin-bottom: 24px;
            }
            .article-title{
                font-size: 28px;
                font-weight: 700;
                color: var(--text-primary, #e0e0f0);
                margin: 0 0 12px 0;
            }
            .article-meta{
                font-family: "SF Mono", "Fira Code", Menlo, monospace;
                font-size: 14px;
                color: var(--text-muted, #555570);
            }
            .article-meta span{
                margin-right: 16px;
            }
        `
    }

    constructor() {
        super()
        this.content = 'loading...'
        this.title = ''
        this.author = ''
        this.createdAt = ''
    }

    firstUpdated() {
        const data = window.__ARTICLE__
        if (data) {
            this.title = data.title || ''
            this.content = data.content || ''
            this.author = data.author || ''
            this.createdAt = data.createdAt || ''
        }
    }

    formatDate(dateStr) {
        if (!dateStr) return ''
        return new Date(dateStr).toLocaleDateString('zh-CN')
    }

    render() {
        return html`
            <div class="article-header">
                <h1 class="article-title">${this.title}</h1>
                <div class="article-meta">
                    <span>${this.author}</span>
                    <span>${this.formatDate(this.createdAt)}</span>
                </div>
            </div>
            <markdown-content content=${this.content}></markdown-content>
        `
    }
}

customElements.define('article-item', ArticleItem)
