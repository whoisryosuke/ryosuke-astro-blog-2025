export function getBlogPostDescription(
  defaultDescription: string | undefined,
  body: string | undefined,
) {
  if (defaultDescription) return defaultDescription;

  const splitBody = body?.split("\r\n").filter((text) => text != "") ?? [];
  const firstHeadingIndex = splitBody.findIndex(
    (paragraph) => paragraph.charAt(0) == "#",
  );
  const description =
    firstHeadingIndex > 0 ? splitBody[firstHeadingIndex - 1] : undefined;

  return description;
}
