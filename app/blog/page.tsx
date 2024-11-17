import getPostMetadata from "@/utils/getPostMetadata";
import Link from "next/link";
import React from "react";

export default function BlogPage() {
  const posts = getPostMetadata("articles");
  const totalItems = 52;

  // Generate all items with week numbers
  const allItems = Array.from({ length: totalItems }, (_, index) => {
    const weekNumber = index + 1;
    return posts[index] || { title: `Week${weekNumber}`, slug: null };
  });

  return (
    <main className="max-w-screen-xl my-0 mx-auto">
      <div>
        <h1 className="text-4xl my-5 font-bold">Blog Page - 2025</h1>
      </div>

      <div className="max-w-full">
        <ul className="flex flex-wrap justify-start gap-8">
          {allItems.map((item, index) => (
            <li
              className={`w-1/5 h-1/6 border border-white p-5 ${
                item.slug
                  ? "hover:border-blue-500"
                  : "bg-gray-300 hover:bg-red-500 cursor-not-allowed"
              }`}
              key={index}
            >
              {item.slug ? (
                <Link href={`/blog/${item.slug}`}>
                  <div className="text-center">
                    <h1 className="text-2xl">{item.title}</h1>
                  </div>
                </Link>
              ) : (
                <div className="text-center">
                  <h1 className="text-2xl">{item.title}</h1>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
