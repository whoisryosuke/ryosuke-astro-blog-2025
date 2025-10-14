import BlogTagInteraction from "./BlogTagInteraction";

type Props = {
  tags: string[];
};

const BlogTags = ({ tags }: Props) => {
  return <BlogTagInteraction tags={tags} />;
};

export default BlogTags;
