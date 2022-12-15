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

            <p>My name is Marika. I built this site because, basically, I love microblogging!</p>
            <p>I had been a long-time Twitter and Tumblr user, when I came to the sudden realization that I was the primary reader of my own content and thus did not need all the social aspects that come with these other platforms.  It was time for me to GTFO! (Granted, my own exodus from Twitter is not wholly removed from... whatever is going on over there at the time of writing in late-2022.)</p>
            <p>But then I asked <Link href='/tagged/travis'>Travis</Link>:</p>
            <blockquote>If I give up on social media, to what platform can I upload thoughts such as "need boba" and "puzzles are difficult"?</blockquote>
            <p>and he texted back (and thus coined the name):</p>
            <blockquote>Babynet!</blockquote>
            <p>Now I am building the future of the internet with Babynet.  I told Travis he could be the CTO because I will be a Ty Haney-at-Outdoor Voices-type girlboss (derogatory, admirable).</p>

            <p>If you want, you can contact me.  I am actively looking for employment</p>

        </Layout>
    )
}
