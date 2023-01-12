import Layout from '../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import { siteTitle } from '../components/globalvars';
import utilStyles from '../styles/utils.module.css'
import prisma from '../lib/prisma';

const pageTitle = "List of tags"

export async function getStaticProps() {
    // const allTags = await prisma.tag.findMany({
    //     select: {
    //         tagmap: {
    //             select: { postid: true },
    //             orderBy: { postid: 'desc' }, take: 1,
    //         },
    //         name: true,
    //     },
    // },

    // )

    const allTags2 = await prisma.tag.findMany({
        select: {
            name:true,
            tagmap: {
                select: {
                    posts: {
                        select: {
                            date: true,
                        }
                    }
                },
                orderBy: {
                    posts: {
                        date: 'desc'
                    }
                },
                take: 1,
            }
        },
    },

    )


    // I could probably do the recollect/sort in relation to the above query,
    // but I would need to think about it harder.
    const cleanerTags = [];
    allTags2.map((tag) => {
        if (tag.tagmap[0]) {
            cleanerTags.push({ recentid: tag.tagmap[0].posts.date, name: tag.name })
        }
    })
    // Sort by recently used
    cleanerTags.sort((a, b) => {
        const date1 = new Date(a.recentid);
        const date2 = new Date(b.recentid);
    
    return date2 - date1;
        //return b.recentid - a.recentid;
    });

    return {
        props: {
            cleanerTags
        },
    }
}

export default function Tags({ cleanerTags }) {

    return (
        <Layout>
            <Head>
                <title>{pageTitle + ' | ' + siteTitle}</title>
            </Head>

            <h1>{pageTitle}</h1>
            <p>Currently sorted by most recently used</p>

            <h2>
                <ul className={utilStyles.tagsul}>
                    {cleanerTags.map((tag) => (
                        <li className={utilStyles.tagsli} key={tag.name}>
                            <Link href={`/tagged/${tag.name}`}>
                                #{tag.name}
                            </Link>
                            &nbsp;
                        </li>
                    ))}
                </ul>
            </h2>

        </Layout>
    )
}