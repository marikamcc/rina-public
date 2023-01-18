import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { siteTitle, revalidateTime } from '../components/globalvars';
import Date from '../components/date';
import prisma from '../lib/prisma';

export async function getStaticProps() {
  const allPostsData = await prisma.posts.findMany({
    orderBy: { date: 'desc' },
    skip: 0,
  })

  return {
    props: {
      allPostsData,
    },
    revalidate: revalidateTime,
  };
}

const pageTitle = 'Archive';

export default function Archive({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>{pageTitle + ' | ' + siteTitle}</title>
      </Head>

      <h1>{pageTitle}</h1>

      <p>Some posts do not have titles, thus the "| id:" on some entries.  I will probably make updates to this page later, but for now I think it is fine as-is.
      </p>

      <div className={utilStyles.spacePrime}></div>

      <ul className={utilStyles.list}>

        {allPostsData.map(({ url, date, title }) => (
          <li className={utilStyles.listItem} key={url}>
            <div className={utilStyles.noUnderl}>
              <small className={utilStyles.lightText}><Date dateString={date} /></small>
              <br />
              <Link href={`/post/${url}`} className={utilStyles.posth3}>
                {title} | id:{url}
              </Link>
            </div>
            <div className={utilStyles.space}></div>
          </li>
        ))}

      </ul>
    </Layout>
  );
}
