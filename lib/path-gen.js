import fs from 'fs';
import { getAllTagsClean, postsDirectory } from './utils';
import { postsPerPageValue } from '../components/globalvars';
import { getNumPosts, getNumPages } from './utils';

// Used for getStaticPaths for [id].js
// Function taken from the Next.js starter tutorial
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

// Used for getStaticPaths for [tag].js
export function getAllTagPaths() {
    const tagArr = getAllTagsClean();
    return tagArr.map((tagArr) => {
        return {
            params: {
                tag: tagArr
            }
        }
    });
}

// Used for getStaticPaths for [pagenum].js
export function getAllPages(postsPerPage = postsPerPageValue) {
    
    const numPosts = getNumPosts();
    const numPages = getNumPages(numPosts, postsPerPage);

    const pages = Array(numPages).fill().map((x, i) => (i + 1).toString());

    return pages.map((pages) => {
        return {
            params: {
                pagenum: pages,
            }
        }
    });
}

