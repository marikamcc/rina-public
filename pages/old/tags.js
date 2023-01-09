import Layout from '../../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import { siteTitle } from '../../components/globalvars';
// import { getAllTags2 } from '../lib/t-utils';

import utilStyles from '../styles/utils.module.css'
import { getAllTagsClean } from '../../lib/utils';

const pageTitle = "List of tags"

export async function getStaticProps() {
    const allTags = getAllTagsClean();
    return {
        props: {
            allTags
        },
    }
}

export default function Tags({ allTags }) {

    return (
        <Layout>
            <Head>
                <title>{pageTitle + ' | ' + siteTitle}</title>
            </Head>

            <h1>{pageTitle}</h1>
            <p>Currently sorted by most recently used</p>
            
            <h2>
                <ul className={utilStyles.tagsul}>
                    {allTags.map((tag) => (
                        <li className={utilStyles.tagsli} key={tag}>
                            <Link href={`/tagged/${tag}`}>
                                #{tag}
                            </Link>
                            &nbsp;
                        </li>
                    ))}
                </ul>
            </h2>

        </Layout>
    )
}