import Layout from '../../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';
import { siteTitle } from "../../components/globalvars";
import Date from '../../components/date';
import { postsPerPageValue } from '../../components/globalvars';

import prisma from '../../lib/prisma';

function createPost2(id, title, date, content, tagmap) {
    const addTagsToPost = addTags2(tagmap);

    // if (tagmap[0]) {
    //     tagmap.map( (tagmap) => {
    //         console.log(tagmap.tag.name)
    //     })
    // } else {
    //     console.log('no tags')
    // }

    return (
        <>
            {title && <h1 className={utilStyles.posth3}>{title}</h1>}
            <div dangerouslySetInnerHTML={{ __html: content }} />
            {/* {content} */}
            <div className={utilStyles.indexDateLink}>
                <Link href={`/post/${id}`}>
                    <Date dateString={date} />
                </Link>
            </div>
            {addTagsToPost}
        </>
    )
};

function addTags2(tagmap) {
    if (tagmap[0]) {
        return (
            tagmap.map((tagmap) => {
                return (
                    // <>
                    //     <Link href={`/tagged/${tag.toLowerCase()}`}>#{tag}</Link>&nbsp;
                    // </>
                    <>
                        <Link href={`/tagged/${tagmap.tag.name.toLowerCase()}`}>#{tagmap.tag.name}</Link>&nbsp;
                    </>
                )
            })
        )
    } else { return }
};

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
    }
  }



export default function Test( {allPosts, numPosts}) {
  
    // const collection = collect(id, title, tags, date, content);
    //console.log(allPosts[2].tagmap[0].tag.name)

    // allPosts[2].tagmap.map( ({tag}) => {
    //     console.log(tag.name)
    // })
  
    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>

        <ul className={utilStyles.list}>
            {allPosts.map( ( {id, date, title, body, url, tagmap} ) => {
                return (
                    <li className={utilStyles.listItemLandingPage} key={id}>
                        {createPost2(url, title, date, body, tagmap)}
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