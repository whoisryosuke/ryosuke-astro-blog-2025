import { getCollection, render } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { getBlogPostDescription } from "../utils/blog";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import mdxRenderer from "@astrojs/mdx/server.js";
import reactRenderer from "@astrojs/react/server.js";
import { components } from "../components/mdx/MDXProvider";

const handleContent = async (container, post) => {
  const { Content } = await render(post);
  const html = await container.renderToString(Content, {
    props: {
      components,
    },
  });
  // const html = "test";

  console.log("rss html", html);

  return html;
};

// @see: https://github.com/delucis/astro-blog-full-text-rss/blob/latest/src/pages/rss.xml.ts
export async function GET(context) {
  // Create a new Astro container that we can render components with.
  // See https://docs.astro.build/en/reference/container-reference/
  const container = await AstroContainer.create();
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
        content: await handleContent(container, post),
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
