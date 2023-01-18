import Head from 'next/head';
import Link from 'next/link';
// import Link from 'next/link';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { siteTitle } from '../components/globalvars';

const pageTitle = 'About';

export default function About() {
    return (
        <Layout>
            <Head>
                <title>{pageTitle + ' | ' + siteTitle}</title>
            </Head>

            <h1>{pageTitle}</h1>

            <p>At the time of writing, I am actively looking for employment.  Please reach out to me on LinkedIn.</p>

            <p>Need to make an edit for a push.</p>

        </Layout>
    )
}
