/**
 * Converts a string to a URL-safe slug.
 * @param {string} str The input string (e.g., "My Blog Post Title!").
 * @returns {string} The slug (e.g., "my-blog-post-title").
 */
export function slugify(text: string) {
  return text
    .toLowerCase() // Convert to lowercase for consistency.
    .trim() // Remove leading/trailing white space.
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens.
    .replace(/\s+/g, "-") // Replace spaces with a single hyphen.
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen.
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens.
}
