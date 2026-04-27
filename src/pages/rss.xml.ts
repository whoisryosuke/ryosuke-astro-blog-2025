import { getCollection, render, type CollectionEntry } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { getBlogPostDescription } from "../utils/blog";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import mdxRenderer from "@astrojs/mdx/server.js";
import reactRenderer from "@astrojs/react/server.js";
import { components } from "../components/mdx/MDXProvider";
import { parse, HTMLElement } from "node-html-parser";
import type { APIContext } from "astro";

const HEADING_TAGS = new Set(["H1", "H2", "H3", "H4", "H5", "H6"]);

export function truncateToPreHeadingContent(
  root: HTMLElement,
  postUrl: string,
) {
  const result = [];

  for (const node of root.childNodes) {
    if (HEADING_TAGS.has(node.rawTagName?.toUpperCase())) {
      break;
    }
    result.push(node.toString());
  }

  const description = result.at(0);

  result.push(`<p><a href="${postUrl}">Read more ▶️</a></p>`);

  return {
    content: result.join(""),
    description,
  };
}
// type BlogPost = CollectionEntry<"blog">;

const handleContent = async (dom: HTMLElement, postUrl: string) => {
  return truncateToPreHeadingContent(dom, postUrl);
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
      .map(async (post) => {
        // Render the post from MDX -> HTML
        const { Content } = await render(post);
        const html = await container.renderToString(Content, {
          props: {
            components,
          },
        });
        const dom = parse(html);
        const { content, description = "" } = await handleContent(
          dom,
          `${baseUrl}/blog/${post.id}/`,
        );

        console.log("rss", { content, description });

        return {
          title: post.data.title,
          description: post.data.description ?? description,
          categories: post.data.tags,
          content,
          pubDate: post.data.date,
          link: `/blog/${post.id}/`,
        };
      }),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
  });
}
