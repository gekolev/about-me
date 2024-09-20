import Markdown from "markdown-to-jsx"
import getPostMetadata from "@/utils/getPostMetadata"
import React from 'react'
import fs from 'fs'
import matter from "gray-matter"

function getPostContent(slug: string) {
    const folder = 'articles/'

    const fileName = slug.replace(/_/g, ' ') + '.md'
    const filePath = folder + fileName

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)

    return matterResult
}

export const generateStaticParams = async () => {
    const posts = getPostMetadata('articles')
    return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const id = params?.slug ? ' ⋅ ' + params?.slug : ''
    return {
        title: `Title Example${id.replaceAll('_', ' ')}`
    }
}

export default function RecipePage(props: { params: { slug: any } }) {

    const slug = props.params.slug
    const post = getPostContent(slug)
    console.log(post)
    return (
        <main>
            <article>
                <Markdown>{post.content}</Markdown>
            </article>
        </main>
    )
}