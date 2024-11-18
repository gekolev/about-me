import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import Markdown from "markdown-to-jsx";
import fs from "fs";
import matter from "gray-matter";
import React from "react";
import path from "path";

function getPostContent(slug: string) {
  const folder = path.join(process.cwd(), "articles");
  const fileName = slug.replace(/_/g, " ") + ".md";
  const filePath = path.join(folder, fileName);

  const fileContents = fs.readFileSync(filePath, "utf8");
  const matterResult = matter(fileContents);

  return matterResult;
}

export default function RecipePage(props: { params: { slug: string } }) {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  const overrides = {
    p: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      props?: React.HTMLAttributes<HTMLParagraphElement>;
    }) => {
      if (
        Array.isArray(children) &&
        children.length === 1 &&
        React.isValidElement(children[0])
      ) {
        const element = children[0] as React.ReactElement<{ href?: string }>;
        if (element.props.href) {
          const youtubeRegex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+|(?:v|e(?:mbed)?)\/([^&?\/\n\s]+)|\S*?[?&]v=([^&\n\s]+))|youtu\.be\/([^&\n\s]+))/;
          const match = youtubeRegex.exec(element.props.href);

          if (match) {
            const videoId = match[1] || match[2] || match[3];
            return (
              <YouTubeEmbed src={`https://www.youtube.com/embed/${videoId}`} />
            );
          }
        }
      }
      return <p {...props}>{children}</p>;
    },
  };

  return (
    <main>
      <article>
        <Markdown options={{ overrides }}>{post.content}</Markdown>
      </article>
    </main>
  );
}
