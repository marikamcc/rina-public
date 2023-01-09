import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css'

import { siteTitle } from '../../components/globalvars';
import { getAllPostIds } from '../../lib/path-gen';
import { getPostData } from '../../lib/utils';
import { addTags } from '../../lib/misc';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}


export default function Post({ postData }) {

  let codeForTags = ''
  if (postData.tags) {
    codeForTags = addTags(postData.tags);
  }

  let titleForHead ='';
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
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>

      {codeForTags}

      <br /><br />
    </Layout>
  )

}