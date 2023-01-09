import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css"
import { formatTagPath } from "../../lib/path-gen";
import { siteTitle } from "../../components/globalvars";
import prisma from "../../lib/prisma";
import { createPost } from "../../lib/misc";

export async function getStaticProps({ params }) {

    const taggedPostsInit = await prisma.tag.findMany({
        where: { name: params.tag },
        include: {
            tagmap: {
                select: {
                    posts: true
                },
                orderBy: {
                    posts: {
                        date: 'desc'
                    }
                }
            }
        }
    })

    const reduced = taggedPostsInit[0].tagmap;
    const taggedPosts = [];
    reduced.map((item) => {
        taggedPosts.push(item.posts)
    })

    return {
        props: {
            params, taggedPosts
        },
    }
}

export async function getStaticPaths() {
    const test = await prisma.tag.findMany();
    const paths = formatTagPath(test)

    return {
        paths,
        fallback: false,
    };
}


export default function Tag({ params, taggedPosts }) {
    return (
        <Layout>
            <Head>
                <title>{"#" + params.tag + " | " + siteTitle}</title>
            </Head>

            <h1>#{params.tag}</h1>
            <h1>&nbsp;</h1>
            <ul className={utilStyles.list}>
                {taggedPosts.map(({ url, date, title, body }) => {
                    return (
                        <li className={utilStyles.listItemLandingPage} key={url}>
                            {createPost(url, title, date, body, [])} 
                            {/* Empty tagmap because I don't want to deal with showing
                            other tags on the tag page.  Could do this later, though. */}
                        </li>
                    )

                    // <li className={utilStyles.listItem} key={url}>
                    //     <div className={utilStyles.noUnderl}>
                    //         <small className={utilStyles.lightText}><Date dateString={date} /></small>
                    //         <br />
                    //         <Link href={`/post/${url}`} className={utilStyles.posth3}>
                    //             {title} | id:{url}
                    //         </Link>
                    //     </div>
                    //     <div className={utilStyles.space}></div>
                    // </li>

                }
                )}
            </ul>

        </Layout>
    )
}