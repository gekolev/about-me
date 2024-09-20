import fs from 'fs'
import matter from 'gray-matter'

export default function getPostMetadata(basePath: string) {
    const folder = basePath + '/'
    const files = fs.readdirSync(folder)
    const markdownPosts = files.filter(file => file.endsWith('.md'))

    // get the file data
    const posts = markdownPosts.map((filename) => {
        const fileContents = fs.readFileSync(`${basePath}/${filename}`, 'utf8')
        const matterResult = matter(fileContents)

        // Sanitize the slug by replacing spaces with dashes
        const sanitizedSlug = filename.replace('.md', '').replace(/\s+/g, '_')

        return {
            title: matterResult.data.title,
            prep_time: matterResult.data.prep_time,
            cook_time: matterResult.data.cook_time,
            date: matterResult.data.date,
            bio: matterResult.data.description,
            slug: sanitizedSlug // Use sanitized slug
        }
    })
    return posts
}
