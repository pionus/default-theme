import {graphql} from './common.js'

export function getArticle(id) {
    return graphql({
        query: `{
                article(id: "${id}") {
                    id
                    content
                }
            }`,
    }).then(data => data.article)
}

export function getList() {
    return graphql({
        query: `{
                list {
                    id
                    title
                    content
                }
            }`,
    }).then(data => data.list)
}


export default {
    getList,
    getArticle,
}
