import getPostMetadata from "@/utils/getPostMetadata";
import ClientBlogList from "@/components/ui/ClientBlogList";
import CustomCursor from "@/components/ui/CustomCursor";

// Define types for posts and titles
type PostItem = {
  title: string;
  slug: string | null;
  bio: string | null;
};

type TitleItem = {
  isTitle: true; // Ensure isTitle is always `true`
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
  const seasonMapping = [
    { title: "Winter", startWeek: 1, endWeek: 12 }, // Winter start
    { title: "Spring", startWeek: 13, endWeek: 25 },
    { title: "Summer", startWeek: 26, endWeek: 39 },
    { title: "Autumn", startWeek: 40, endWeek: 50 },
    { title: "Winter", startWeek: 51, endWeek: 52 }, // Winter end
  ];

  // Insert titles and organize items
  const itemsWithTitles: Item[] = [];
  for (const season of seasonMapping) {
    itemsWithTitles.push({ isTitle: true, title: season.title }); // Explicitly assign true to isTitle
    for (let week = season.startWeek; week <= season.endWeek; week++) {
      const itemIndex = week - 1;
      itemsWithTitles.push(allItems[itemIndex]);
    }
  }

  return (
    <main className="max-w-screen-xl py-6 mx-auto px-4 xl:px-0">
      <CustomCursor />
      <div>
        <h1 className=" text-6xl md:text-9xl mb-6 font-bold md:text-right w-full select-none">Blog-2025</h1>
      </div>

      <ClientBlogList items={itemsWithTitles} />

    </main>
  );
}
