import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { siteTitle } from '../components/globalvars';
import Date from '../components/date';
import { getSortedPostsData } from '../lib/utils';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
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

        {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <div className={utilStyles.noUnderl}>
              <small className={utilStyles.lightText}><Date dateString={date} /></small>
              <br />
              <Link href={`/post/${id}`} className={utilStyles.posth3}>
                {title} | id:{id}
              </Link>
            </div>
            <div className={utilStyles.space}></div>
          </li>
        ))}

      </ul>
    </Layout>
  );
}
