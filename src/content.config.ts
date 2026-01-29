import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      section: z.string(),
      tags: z.array(z.string()),
      // description: z.string(),
      // Transform string to Date object
      date: z.coerce.date(),
      // updatedDate: z.coerce.date().optional(),
      cover_image: image().optional(),
    }),
});

const projects = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      website: z.string().optional(),
      case_study: z.string().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()),
      images: z.array(z.string()),
      // Transform string to Date object
      date: z.coerce.date(),
      cover_image: z.string().optional(),
    }),
});

export const collections = { blog, projects };
