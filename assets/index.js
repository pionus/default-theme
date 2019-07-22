// import markdown from '../web_modules/markdown-it.js'
// import markdown_katex from '../web_modules/markdown-it-katex.js'

// const md = markdown()
// md.use(markdown_katex)
//
// console.log(md)


let EDITOR = editormd("editor", {
    height: 640,
    width: "90%",
    path: "../node_modules/editor.md/lib/",
    tex: true,
})
