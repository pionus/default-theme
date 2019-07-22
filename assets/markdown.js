let md = markdownit()

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
