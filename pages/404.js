import Link from "next/link"
import Layout from '../components/layout';
import Head from "next/head";
import { siteTitle } from '../components/globalvars';

export default function Custom404() {
    const message = "404 - Page Not Found";
    return (
        <Layout fourohfour>
            <Head>
                <title>{message + " | " + siteTitle}</title>
            </Head>
            <h1>{message}</h1>
            <p>It is possible you're seeing this due to <Link href="https://vercel.com/docs/concepts/incremental-static-regeneration/quickstart">Incremental Static Regeneration</Link> and the Vercel re-deployment just hasn't been done yet.</p>
            {/* <p>If you think something should be here, then I am not sure what to tell ya!</p> */}
            <big><big><Link href="/">RETURN HOME</Link></big></big>
        </Layout>
    )
}