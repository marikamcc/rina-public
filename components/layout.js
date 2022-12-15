import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Marika McCarthy';
import { siteTitle } from './globalvars';

const yrinit = '2022'
const d = new Date();
let curyear = d.getFullYear();

export default function Layout({ children }) {
  return (

    <div id={styles.container}>
      <Head>
        <link rel="icon" type="image/x-icon" href="/images/about-photo.jpg"></link>
      </Head>

      <div id={styles.left}>
        My name is Marika, and I am an erstwhile tumblrina who decided I didn't need the social part of social media.  You can edit this description and other properties in ./components/layout.js and in ./components/globalvars.js
        <div className={styles.space}></div>
        <div className={styles.spacesmall}></div>
        <Link href="/" className={styles.h2}>{siteTitle}</Link>
        <div className={styles.space}></div>

        <Link href="/">
          <Image
            priority
            src="/images/about-photo.jpg"
            className={utilStyles.borderCircle}
            height={58}
            width={58}
            alt=""
          />
        </Link>

        <div className={styles.space}></div>
        <Link href='/about'>About</Link> - <Link href='/archive'>Archive</Link> - <Link href='/tags'>Tags</Link><br />
        <a target="_blank" href="http://marikam.cc">Personal site</a> - <a target="_blank" href="http://yearning.marikam.cc">Book blog</a> - <a target="_blank" href='https://github.com/marikamcc/'>GitHub</a>

        <div className={styles.space}></div>
        <small>© {yrinit} - {curyear}<br />{name}</small>

      </div>


      <div id={styles.right}>
        <main>{children}</main>
      </div>

      <div className={styles.clear}></div>

    </div>

  );
}
