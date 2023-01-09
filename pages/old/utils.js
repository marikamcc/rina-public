import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export const postsDirectory = path.join(process.cwd(), 'posts');

// Function taken from the Next.js starter tutorial
export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });

}

// Function taken from the Next.js starter tutorial
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}

export function getAllTagsClean() {
    const sortedPostsData = getSortedPostsData();

    //Future feature: Could do something with a dictionary here to keep track of the number of posts per tag.  
    const tagArr = [];

    for (let post in sortedPostsData) {
        for (let indvTag in sortedPostsData[post].tags){
            tagArr.push( sortedPostsData[post].tags[indvTag].toLowerCase() );
        }
    }

    const uniq = [...new Set(tagArr)];

    // all tags are converted to lower case before being returned
    return uniq;
}

export function matchTagToId(tagOfInterest) {
    // Future feature: Make this better lol

    // I don't love doing this, but I need the sort from the frontmatter
    const allPostsData = getSortedPostsData();

    const matchingIDsPostData = []

    for (const post in allPostsData) {
        if (allPostsData[post].tags) {
            for (const tag in allPostsData[post].tags) {
                if (allPostsData[post].tags[tag].toLowerCase() == tagOfInterest) {
                    matchingIDsPostData.push(allPostsData[post])
                }
            }
        }
    }

    return matchingIDsPostData;
}

export function getNumPosts() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.length;
}

export function getNumPages(numPosts, postsPerPage) {
    return Math.ceil(numPosts / postsPerPage)
}


export function getDataSplitArraysLimit(page = 0, postsPerPage = postsPerPageValue) {

    const bar = getSortedPostsData();

    const id = [];
    const title = [];
    const tags = [];
    const date = [];

    var upperlimit = 0;

    if (getNumPosts() < (page + 1) * postsPerPage) {
        upperlimit = getNumPosts();
    } else {
        upperlimit = (page + 1) * postsPerPage
    }

    for (let post = (page * postsPerPage); post < upperlimit; post++) {
        id.push(bar[post].id);
        title.push(bar[post].title);
        tags.push(bar[post].tags);
        date.push(bar[post].date);
    }

    return {
        id, title, tags, date,
    }
}

export async function getPostContentOnly(idArray) {
    const contentArr = []

    for (let id in idArray) {
        const fullPath = path.join(postsDirectory, `${idArray[id]}.md`)
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        const processedContent = await remark()
            .use(html)
            .process(matterResult.content);
        const contentHtml = processedContent.toString();

        contentArr.push(contentHtml);
    }

    return contentArr;

}
