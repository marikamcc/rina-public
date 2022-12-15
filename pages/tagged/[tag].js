import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css"
import Link from "next/link";
import Date from "../../components/date";
import { getAllTagPaths } from "../../lib/path-gen";
import { matchTagToId } from "../../lib/utils";
import { siteTitle } from "../../components/globalvars";

export async function getStaticProps({ params }) {
  //const allTags = getAllTags2();
  const postsWithTag = matchTagToId(params.tag);
  return {
    props: {
      params, postsWithTag,
    },
  }
}

export async function getStaticPaths() {
  const paths = getAllTagPaths(); //need to implements this and somehow also deal with spaces in the tag.  could do the .replace(' ', '-')
  return {
    paths,
    fallback: false,
  };
}


export default function Tag({ params, postsWithTag }) {
  return (
    <Layout>
      <Head>
        <title>{"#" + params.tag + " | " + siteTitle}</title>
      </Head>

      <h1>#{params.tag}</h1>

      <ul className={utilStyles.list}>

        {postsWithTag.map(({ id, date, title }) => (
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
  )
}