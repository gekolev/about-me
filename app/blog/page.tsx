import getPostMetadata from "@/utils/getPostMetadata";
import Link from "next/link";
import React from "react";
import CustomCursor from "@/components/ui/CustomCursor";

// Define a type for posts and titles
type PostItem = {
  title: string;
  slug: string | null;
  bio: string | null;
};

type TitleItem = {
  isTitle: true;
  title: string;
};

type Item = PostItem | TitleItem;

export default function BlogPage() {
  const posts = getPostMetadata("articles");
  const totalItems = 52;

  const allItems: PostItem[] = Array.from({ length: totalItems }, (_, index) => {
    const weekNumber = index + 1;
    return (
      posts[index] || { title: `Week${weekNumber}`, slug: null, bio: null }
    );
  });

  // Titles for astronomical seasons with week ranges
  const seasonMapping: { title: string; startWeek: number; endWeek: number }[] = [
    { title: "Winter", startWeek: 1, endWeek: 12 }, // Winter start
    { title: "Spring", startWeek: 13, endWeek: 25 },
    { title: "Summer", startWeek: 26, endWeek: 39 },
    { title: "Autumn", startWeek: 40, endWeek: 50 },
    { title: "Winter", startWeek: 51, endWeek: 52 }, // Winter end
  ];

  // Insert titles and organize items
  const itemsWithTitles: Item[] = [];
  for (const season of seasonMapping) {
    itemsWithTitles.push({ isTitle: true, title: season.title });
    for (let week = season.startWeek; week <= season.endWeek; week++) {
      const itemIndex = week - 1;
      itemsWithTitles.push(allItems[itemIndex]);
    }
  }

  return (
    <main className="max-w-screen-xl my-0 mx-auto">
      <div>
        <CustomCursor />
      </div>

      <div>
        <h1 className="text-4xl my-5 font-bold">Blog Page - 2025</h1>
      </div>

      <div className="grid grid-cols-4 gap-8">
        {itemsWithTitles.map((item, index) => {
          if ("isTitle" in item && item.isTitle) {
            return (
              <div
                key={`title-${index}`}
                className="col-span-1 text-center text-3xl font-bold my-5"
              >
                {item.title}
              </div>
            );
          } else {
            // Safely cast item to PostItem
            const postItem = item as PostItem;
            return (
              <div
                className={`border border-white p-5 ${
                  postItem.slug ? "" : "bg-gray-300"
                }`}
                key={index}
                data-cursor={postItem.bio || ""}
              >
                {postItem.slug ? (
                  <Link href={`/blog/${postItem.slug}`}>
                    <div className="text-center">
                      <h1 className="text-2xl">{postItem.title}</h1>
                    </div>
                  </Link>
                ) : (
                  <div className="text-center">
                    <h1 className="text-2xl">{postItem.title}</h1>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
    </main>
  );
}
