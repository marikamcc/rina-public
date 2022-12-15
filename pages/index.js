import Layout from '../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import { siteTitle, postsPerPageValue } from "../components/globalvars";
import { collect, createPost } from '../lib/misc';

import { getDataSplitArraysLimit, getPostContentOnly, getNumPosts } from '../lib/utils';


export async function getStaticProps() {
  const foo = getDataSplitArraysLimit(0, postsPerPageValue);
  const id = foo.id;
  const title = foo.title;
  const tags = foo.tags;
  const date = foo.date;

  const content = await getPostContentOnly(id);

  const numPosts = getNumPosts();
  return {
    props: {
      id, title, tags, date, content, numPosts
    },
  }
}

export default function Home({ id, title, tags, date, content, numPosts }) {
  
  const collection = collect(id, title, tags, date, content);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
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

      {numPosts > postsPerPageValue && <div align='right'> &#9680; <Link href="/page/2">page 2 &gt;&gt;</Link>
      </div>}

    </Layout>
  );
}