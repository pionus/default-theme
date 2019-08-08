import 'https://cdn.bootcss.com/markdown-it/9.0.1/markdown-it.min.js'
import 'https://cdn.bootcss.com/KaTeX/0.10.2/katex.min.js'
import '/assets/markdown-it-math.min.js'

let md = markdownit({
    html: true,
})

md.use(markdownitMath, {
    inlineOpen: '$',
    inlineClose: '$',
    blockOpen: '$$',
    blockClose: '$$',
    inlineRenderer: function (str){
        let output = ''
        try {
            output = katex.renderToString(str.trim())
        } catch (err) {
            output = `<span class="katex-error">${err.message}</span>`
        }
        return output
    },
    blockRenderer: function (str) {
        let output = ''
        try {
            output = katex.renderToString(str.trim(), { displayMode: true })
        } catch (err) {
            output = `<div class="katex-error">${err.message}</div>`
        }
        return output
    }
})

export default function markdown(data) {
    return md.render(data)
}
