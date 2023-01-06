import Layout from '../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import { siteTitle } from "../components/globalvars";


export default function Home() {


  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <h1><Link href="/db">You're probably looking for ./db/index</Link></h1>

    </Layout>
  );
}