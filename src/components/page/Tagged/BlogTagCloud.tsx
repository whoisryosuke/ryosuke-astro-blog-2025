import React from "react";
import BlogTagInteraction from "../BlogPost/BlogTags/BlogTagInteraction";

type Props = {
  tags: string[];
};

const BlogTagCloud = ({ tags }: Props) => {
  return (
    <div>
      <BlogTagInteraction tags={tags} />
    </div>
  );
};

export default BlogTagCloud;
