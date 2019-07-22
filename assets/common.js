// import math from './markdown-it-math.min.js'
import {directive, isPrimitive, NodePart} from '/web_modules/lit-html.js'

export function graphql(options) {
    let {query = ''} = options

    return fetch('/graphql/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query}),
    }).then(res => res.json())
}


const previousValues = new WeakMap();

export const unsafeHTML = directive((value) => (part) => {
    if (!(part instanceof NodePart)) {
        throw new Error('unsafeHTML can only be used in text bindings');
    }
    const previousValue = previousValues.get(part);
    if (previousValue !== undefined && isPrimitive(value) &&
        value === previousValue.value && part.value === previousValue.fragment) {
        return;
    }
    const template = document.createElement('template');
    template.innerHTML = value; // innerHTML casts to string internally
    const fragment = document.importNode(template.content, true);
    part.setValue(fragment);
    previousValues.set(part, { value, fragment });
});
