import getPostMetadata from "@/utils/getPostMetadata";
import Link from "next/link";
import React from 'react';

export default function BlogPage() {
    const posts = getPostMetadata('articles');
    return (
        <main className="max-w-screen-lg my-0 mx-auto">
          <div>
            <h1 className="text-4xl my-5">Blog Page</h1>
          </div>

            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link className="flex justify-between w-full" href={`/blog/${post.slug}`}>
                            <h1 className="text-2xl">{post.title}</h1>
                            <span className="text-xl">{post.date}</span>
                        </Link>
                    </li>
                ))}
            </ul>

        </main>
    );
}
