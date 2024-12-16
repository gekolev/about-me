"use client";

import React, { useEffect, useRef } from "react";
import { staggerIn } from "@/utils/staggerIn";
import Link from "next/link";

// Types for the items
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

type Props = {
  items: Item[];
};

export default function ClientBlogList({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    staggerIn(containerRef.current); // Trigger animations
  }, []);

  return (
    <div ref={containerRef}
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
      {items.map((item, index) => {
        if ("isTitle" in item && item.isTitle) {
          return (
            <div
              key={`title-${index}`}
              className="md:text-center col-span-1 text-3xl font-bold my-5 animated-item"
            >
              {item.title}
            </div>
          );
        } else {
          const postItem = item as PostItem;
          return (
            <div
              className={`border border-white p-5 animated-item ${
                postItem.slug ? "" : "bg-neutral-800 border-none"
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
                  <h1 className="text-2xl line-through">{postItem.title}</h1>
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}
