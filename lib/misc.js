import Link from "next/link"
import Date from '../components/date';
import utilStyles from '../styles/utils.module.css'

export function addTags(tagmap) {
    if (tagmap[0]) {
        return (
            
            tagmap.map((tagmap) => {
                return (
                    <li key={tagmap.tag.name}>
                        <Link href={`/tagged/${tagmap.tag.name.toLowerCase()}`}>#{tagmap.tag.name}</Link>&nbsp;
                    </li>
                )
            })
        )
    } else { return }
};

export function createPost(id, title, date, content, tagmap) {
    const addTagsToPost = addTags(tagmap);
    return (
        <>
            {title && <h1 className={utilStyles.posth3}><Link href={`/post/${id}`}>{title}</Link></h1>}
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div className={utilStyles.indexDateLink}>
                <Link href={`/post/${id}`}>
                    <Date dateString={date} />
                </Link>
            </div>
            <ul id={utilStyles.taglist}>{addTagsToPost}</ul>
        </>
    )
};