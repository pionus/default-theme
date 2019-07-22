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
