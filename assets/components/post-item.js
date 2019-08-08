import {LitElement, html, css} from '/web_modules/lit-element.js'

export default class PostItem extends LitElement {
    static get properties() {
        return {
            title: {type: String},
            tid: {type: String},
        }
    }

    static get styles() {
        return css`
            :host{
                display: block;
                width: 100%;
                overflow: hidden;
            }
            .title{
                font-size: 22px;
                text-decoration: none;
            }
            summary{
                font-size: 12px;
            }
        `
    }

    constructor() {
        super()
    }

    render() {
        return html`
            <div>
                <a class="title" href="/article/${this.tid}">${this.title}</a>
                <summary>时间: ${this.tid}</summary>
            </div>
        `
    }
}

customElements.define('post-item', PostItem)
