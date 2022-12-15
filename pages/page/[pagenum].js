import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import utilStyles from "../../styles/utils.module.css"
import { siteTitle, postsPerPageValue } from "../../components/globalvars";
import { getAllPages } from "../../lib/path-gen";
import { getNumPosts, getNumPages, getDataSplitArraysLimit, getPostContentOnly } from "../../lib/utils";
import { collect, createPost } from "../../lib/misc";

export async function getStaticProps({ params }) {
    const numPosts = getNumPosts();
    const numPages = getNumPages(numPosts, postsPerPageValue);

    const nextPageNum = Number(params.pagenum) + 1;
    const prevPageNum = Number(params.pagenum) - 1;
    const pageIndex = Number(params.pagenum) - 1; //Indexing is off by one

    const foo = getDataSplitArraysLimit(pageIndex, postsPerPageValue);
    const id = foo.id;
    const title = foo.title;
    const tags = foo.tags;
    const date = foo.date;
     const content = await getPostContentOnly(id);

    return {
        props: {
            params, numPosts, nextPageNum, prevPageNum, numPages, id, title, tags, date, content
        },
    }
}

export async function getStaticPaths() {
    const paths = getAllPages();
    return {
        paths,
        fallback: false,
    };
}

export default function Page({ params, nextPageNum, prevPageNum, numPages, id, title, tags, date, content }) {
    const collection = collect(id, title, tags, date, content);

    return (
        <Layout>
            <Head>
                <title>{"Page " + params.pagenum + " | " + siteTitle}</title>
            </Head>

            <ul className={utilStyles.list}>
                {collection.map(({ id, title, tags, date, content }, i) => {
                    return (
                        <li className={utilStyles.listItemLandingPage} key={id}>
                        {createPost(id, title, tags, date, content)}
                        </li>
                        )
                }
                )}
            </ul>

            <div align='right'>
                {prevPageNum > 0 && <Link href={`/page/${prevPageNum}`}>&lt;&lt; page {prevPageNum}</Link>} &#9680; {nextPageNum <= numPages && <Link href={`/page/${nextPageNum}`}>page {nextPageNum} &gt;&gt;</Link>}
            </div>

        </Layout>
    )
}