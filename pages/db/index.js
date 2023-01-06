import Layout from '../../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';
import { siteTitle } from "../../components/globalvars";
import Date from '../../components/date';
// import { createPost } from '../../lib/misc';
import { postsPerPageValue } from '../../components/globalvars';


const { PrismaClient } = require('@prisma/client')

function createPost2(id, title, date, content) {
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
        </>
    )
};

export async function getStaticProps() {
    const prisma = new PrismaClient()
    //const allPosts = await prisma.posts.findMany()
    const allPosts = await prisma.posts.findMany({
        orderBy: { date: 'desc' },
        skip: 0,
        take: postsPerPageValue,
    })

    const numPosts = await prisma.posts.count()

    return {
      props: {
        allPosts, numPosts
      },
    }
  }



// async function main() {

//     const allPosts = await prisma.posts.findMany()
//     console.log(allPosts)

// }


// main()

//   .then(async () => {

//     await prisma.$disconnect()

//   })

//   .catch(async (e) => {

//     console.error(e)

//     await prisma.$disconnect()

//     process.exit(1)

//   })

export default function Test( {allPosts, numPosts}) {
  
    // const collection = collect(id, title, tags, date, content);
    //console.log([allPosts[5]])
  
    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>

        <ul className={utilStyles.list}>
            {allPosts.map( ( {id, date, title, tags, body, url} ) => {
                return (
                    <li className={utilStyles.listItemLandingPage} key={id}>
                        {createPost2(url, title, date, body)}
                    </li>
                )
            }
            )}
        </ul>
  
        {/* <ul className={utilStyles.list}>
          {collection.map(({ id, title, tags, date, content }, i) => {
            return (
              <li className={utilStyles.listItemLandingPage} key={id}>
                {createPost(id, title, tags, date, content)}
              </li>
            )
          }
          )}
        </ul>
        */}
  
        {numPosts > postsPerPageValue && <div align='right'> &#9680; <Link href="/page/2">page 2 &gt;&gt;</Link>
        </div>}

      </Layout>
    );
  }