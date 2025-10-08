import React from "react";
import type { SelectedBlogData } from "../../../../data/selected-blogs";
import SelectedBlogListItem from "./SelectedBlogListItem";
import "./SelectedBlogList.css";

type Props = {
  posts: SelectedBlogData[];
};

const SelectedBlogList = ({ posts = [] }: Props) => {
  return (
    <ul className="SelectedBlogList">
      {posts.map((post) => (
        <SelectedBlogListItem key={post.title} {...post} />
      ))}
    </ul>
  );
};

export default SelectedBlogList;
