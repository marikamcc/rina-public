import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import utilStyles from "../../styles/utils.module.css"
import { siteTitle, postsPerPageValue } from "../../components/globalvars";
import { getAllPages } from "../../lib/path-gen";
import { createPost } from "../../lib/misc";
import prisma from "../../lib/prisma";

export async function getStaticProps({ params }) {
    const numPosts = await prisma.posts.count()
    const numPages = Math.ceil(numPosts / postsPerPageValue);

    const nextPageNum = Number(params.pg) + 1;
    const prevPageNum = Number(params.pg) - 1;
    const pageIndex = Number(params.pg) - 1; //Indexing is off by one

    const allPosts = await prisma.posts.findMany({
        orderBy: { date: 'desc' },
        skip: pageIndex*postsPerPageValue,
        take: postsPerPageValue,
        include: {
            tagmap: {
                select: {
                    tag: {
                        select: {name: true}
                    }
                }
            }
        },

    })
    return {
        props: {
            params, numPosts, numPages, nextPageNum, prevPageNum, pageIndex, allPosts
        },
    }
}

export async function getStaticPaths() {
    const numPosts = await prisma.posts.count()
    const paths = getAllPages(numPosts);
    return {
        paths,
        fallback: false,
    };
}

export default function Page({ params, nextPageNum, prevPageNum, numPosts, numPages, allPosts}) {

    return (
        <Layout>
            <Head>
                <title>{"Page " + params.pg + " | " + siteTitle}</title>
            </Head>

            <ul className={utilStyles.list}>
                {allPosts.map( ( {id, date, title, body, url, tagmap} ) => {
                    return (
                        <li className={utilStyles.listItemLandingPage} key={id}>
                            {createPost(url, title, date, body, tagmap)}
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