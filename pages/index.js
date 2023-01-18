import Layout from '../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import { revalidateTime, siteTitle } from "../components/globalvars";
import { postsPerPageValue } from '../components/globalvars';
import prisma from '../lib/prisma';
import { createPost } from '../lib/misc';


export async function getStaticProps() {
    const allPosts = await prisma.posts.findMany({
        orderBy: { date: 'desc' },
        skip: 0,
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

    const numPosts = await prisma.posts.count()

    return {
      props: {
        allPosts, numPosts
      },
      revalidate: revalidateTime,
    }
  }



export default function Home( {allPosts, numPosts}) {
  
    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
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
  
        {numPosts > postsPerPageValue && <div align='right'> &#9680; <Link href="/page/2">page 2 &gt;&gt;</Link>
        </div>}

      </Layout>
    );
  }