import Link from "next/link"
import Date from '../components/date';
import utilStyles from '../styles/utils.module.css'

export function addTags(tagArr) {
    if (tagArr) {
        return (
            tagArr.map((tag) => {
                return (
                    <>
                        <Link href={`/tagged/${tag.toLowerCase()}`}>#{tag}</Link>&nbsp;
                    </>
                )
            })
        )
    } else { return }
}

export function collect(id, title, tags, date, content) {
    const collection = []
    for (const i in id) {
        collection.push({ id: id[i], title: title[i], tags: tags[i], date: date[i], content: content[i] });
    }
    return collection;
}

export function createPost(id, title, tags, date, content) {
    const addTagsToPost = addTags(tags);
    return (
        <>
            {title && <h1 className={utilStyles.posth3}>{title}</h1>}
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div className={utilStyles.indexDateLink}>
                <Link href={`/post/${id}`}>
                    <Date dateString={date} />
                </Link>
            </div>
            {addTagsToPost}
        </>
    )
};