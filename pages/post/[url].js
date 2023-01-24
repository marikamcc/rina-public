import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css'
import { revalidateTime, siteTitle } from '../../components/globalvars';
import prisma from '../../lib/prisma';
import { formatPostPath } from '../../lib/path-gen';
import { addTags } from '../../lib/misc';

export async function getStaticProps({ params }) {
  const postData = await prisma.posts.findUnique({
    where: {
      url: params.url,
    },
    include: {
      tagmap: {
        select: {
          tag: {
            select: { name: true }
          }
        }
      }
    }
  })
  return {
    props: {
      postData,
    },
    revalidate: revalidateTime,
  };
}

export async function getStaticPaths() {
  const input = await prisma.posts.findMany({
    orderBy: { date: 'desc' },
    select: { url: true }
  })
  const paths = formatPostPath(input);
  return {
    paths,
    fallback: 'blocking',
  };
}


export default function Post({ postData }) {
  let codeForTags = ''
  if (postData.tags) {
    codeForTags = addTags(postData.tagmap)
  }

  let titleForHead = '';
  if (!postData.title) {
    titleForHead = 'Untitled post'
  } else {
    titleForHead = postData.title;
  }

  return (
    <Layout>
      <Head>
        <title>{titleForHead + ' | ' + siteTitle}</title>
      </Head>

      <h1 className={utilStyles.posth3}>{postData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.body }} />

      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>

      <ul id={utilStyles.taglist}>{codeForTags}</ul>

      <br /><br />
    </Layout>
  )

}