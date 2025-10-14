import React, { forwardRef } from "react";
import "./BlogTag.css";

type Props = {
  tag: string;
};
const BlogTag = forwardRef<HTMLAnchorElement, Props>(({ tag }, ref) => {
  return (
    <a ref={ref} href="#" className="BlogTag">
      <h2>{tag}</h2>
    </a>
  );
});

export default BlogTag;
