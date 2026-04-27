import { getCollection, render, type CollectionEntry } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { getBlogPostDescription } from "../utils/blog";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import mdxRenderer from "@astrojs/mdx/server.js";
import reactRenderer from "@astrojs/react/server.js";
import { components } from "../components/mdx/MDXProvider";
import { parse } from "node-html-parser";
import type { APIContext } from "astro";

const HEADING_TAGS = new Set(["H1", "H2", "H3", "H4", "H5", "H6"]);

export function truncateToPreHeadingContent(html: string, postUrl: string) {
  const root = parse(html);
  const result = [];

  for (const node of root.childNodes) {
    if (HEADING_TAGS.has(node.rawTagName?.toUpperCase())) {
      break;
    }
    result.push(node.toString());
  }

  result.push(`<p><a href="${postUrl}">Read more ▶️</a></p>`);

  return result.join("");
}
type BlogPost = CollectionEntry<"blog">;

const handleContent = async (
  container: AstroContainer,
  post: BlogPost,
  postUrl: string,
) => {
  const { Content } = await render(post);
  const html = await container.renderToString(Content, {
    props: {
      components,
    },
  });
  // const html = "test";

  console.log("rss html", html);

  return truncateToPreHeadingContent(html, postUrl);
};

// Inspired by this setup using Astro's experimental container API
// @see: https://github.com/delucis/astro-blog-full-text-rss/blob/latest/src/pages/rss.xml.ts
export async function GET(context: APIContext) {
  let baseUrl = context.site?.href || "https://whoisryosuke.com";
  if (baseUrl.at(-1) === "/") baseUrl = baseUrl.slice(0, -1);
  // Create a new Astro container that we can render components with.
  // See https://docs.astro.build/en/reference/container-reference/
  const container = await AstroContainer.create();

  // Add renderers manually because the other way breaks Vite
  // due to the `astro:container` import
  container.addServerRenderer({ renderer: mdxRenderer });
  container.addServerRenderer({ renderer: reactRenderer });
  container.addClientRenderer({
    name: "@astrojs/react",
    entrypoint: "@astrojs/react/client.js",
  });

  const posts = await getCollection("blog");

  const items = await Promise.all(
    posts
      .sort((a, b) => b.data.date - a.data.date)
      .map(async (post) => ({
        title: post.data.title,
        description: getBlogPostDescription(post.data.description, post.body),
        categories: post.data.tags,
        content: await handleContent(
          container,
          post,
          `${baseUrl}/blog/${post.id}/`,
        ),
        pubDate: post.data.date,
        link: `/blog/${post.id}/`,
      })),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
  });
}
