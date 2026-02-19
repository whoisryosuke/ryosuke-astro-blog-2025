import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { getBlogPostDescription } from "../utils/blog";

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date - a.data.date)
      .map((post) => ({
        title: post.data.title,
        description: getBlogPostDescription(post.data.description, post.body),
        categories: post.data.tags,
        content: post.body,
        pubDate: post.data.date,
        link: `/blog/${post.id}/`,
      })),
  });
}
