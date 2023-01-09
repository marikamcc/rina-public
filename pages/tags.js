import Layout from '../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import { siteTitle } from '../components/globalvars';
import utilStyles from '../styles/utils.module.css'
import prisma from '../lib/prisma';

const pageTitle = "List of tags"

export async function getStaticProps() {
    const allTags = await prisma.tag.findMany( {
        select: {
            tagmap: {
                select: {postid: true},
                orderBy: {postid: 'desc'}, take: 1,
            },
            name: true,
            },
        },
        
    )


    // I could probably do the recollect/sort in relation to the above query,
    // but I would need to think about it harder.
    const cleanerTags = [];
    allTags.map( (tag) => {
        if (tag.tagmap[0]) {
            cleanerTags.push({recentid: tag.tagmap[0].postid, name: tag.name})
            // console.log(tag.tagmap[0].postid, tag.name)
        }
    })
    // Sort by recently used
    cleanerTags.sort( (a,b) => {
        return b.recentid - a.recentid;
    });

    return {
        props: {
            cleanerTags
        },
    }
}

export default function Tags({cleanerTags}) {
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