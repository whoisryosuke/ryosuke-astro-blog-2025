import React from "react";
import "./BlogPostTitle.css";

type Props = {
  title: string;
};

const BlogPostTitle = ({ title }: Props) => {
  return (
    <div className="BlogPostTitle">
      <div className="text">
        <h1 data-content={title}>{title}</h1>
      </div>
    </div>
  );
};

export default BlogPostTitle;
