import { postsPerPageValue } from '../components/globalvars';

export function formatPostPath(input) {
    return input.map( (input) => {
        return {
            params: {
                url: input.url,
            },
        };
    });
}

export function formatTagPath(input) {
    return input.map( (input) => {
        return {
            params: {
                tag: input.name,
            },
        };
    });
}

export function getAllPages(numPosts, postsPerPage = postsPerPageValue) {
    const numPages = Math.ceil(numPosts / postsPerPage)

    const pages = Array(numPages).fill().map((x, i) => (i + 1).toString());

    return pages.map( (pages) => {
        return {
            params: {
                pg: pages,
            }
        }
    })
}