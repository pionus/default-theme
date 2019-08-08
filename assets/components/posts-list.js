import {LitElement, html, css} from '/web_modules/lit-element.js'
import api from '../api.js'
import './post-item.js'


export default class PostsList extends LitElement {
    static get properties() {
        return {
            list: {
                type: Array,
                attribute: false,
            },
        }
    }

    static get styles() {
        return css`
            .content{
                padding: 16px 0;
            }
            post-item{
                margin-bottom: 16px;
            }
        `
    }

    constructor() {
        super()
        this.list = []
        this.getList()
    }

    async getList() {
        this.list = await api.getList()
    }

    render() {
        return html`
            <div class="content">
                ${this.list.map(item => html`<post-item tid=${item.id} title=${item.title} />`)}
            </div>
        `
    }
}

customElements.define('posts-list', PostsList)
