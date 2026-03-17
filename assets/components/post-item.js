import {LitElement, html, css} from '/web_modules/lit-element.js'

export default class PostItem extends LitElement {
    static get properties() {
        return {
            title: {type: String},
            slug: {type: String},
            createdAt: {type: String, attribute: 'created-at'},
        }
    }

    static get styles() {
        return css`
            :host{
                display: block;
                width: 100%;
                overflow: hidden;
            }
            .post{
                padding: 16px 0;
                border-bottom: 1px solid #eee;
            }
            .title{
                font-size: 20px;
                text-decoration: none;
                color: #333;
                font-weight: 500;
            }
            .title:hover{
                color: #2196f3;
            }
            .meta{
                font-size: 13px;
                color: #999;
                margin-top: 6px;
            }
        `
    }

    constructor() {
        super()
    }

    formatDate(dateStr) {
        if (!dateStr) return ''
        return new Date(dateStr).toLocaleDateString('zh-CN')
    }

    render() {
        return html`
            <div class="post">
                <a class="title" href="/article/${this.slug}">${this.title}</a>
                <div class="meta">${this.formatDate(this.createdAt)}</div>
            </div>
        `
    }
}

customElements.define('post-item', PostItem)
