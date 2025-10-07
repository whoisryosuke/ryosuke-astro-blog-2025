import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import Stack from "../../../primitives/Stack/Stack";
import "./SelectedBlogs.css";
import FileIcon from "../../../icons/FileIcon";
import Button from "../../../primitives/Button/Button";
import { BiChevronsRight } from "react-icons/bi";
import type { SelectedBlogData } from "../../../../data/selected-blogs";
import SELECTED_BLOGS from "../../../../data/selected-blogs";

type Props = {};

const SelectedBlogListItem = ({ title, url }: SelectedBlogData) => {
  return (
    <li>
      <FileIcon />
      <a href={url}>
        <h3>{title}</h3>
      </a>
    </li>
  );
};

const SelectedBlogs = (props: Props) => {
  const renderBlogs = SELECTED_BLOGS.map((blog) => (
    <SelectedBlogListItem key={blog.title} {...blog} />
  ));

  return (
    <div className="SelectedBlogs" style={{ minHeight: "500px" }}>
      <SectionHeading title="Selected Blogs" />
      <Stack horizontal>
        <div className="left">
          <Button
            as="a"
            href="#"
            style={{
              paddingLeft: "var(--space-12)",
            }}
          >
            <span>Blog Archive</span>
            <BiChevronsRight />
          </Button>
        </div>
        <ul className="list">{renderBlogs}</ul>
      </Stack>
    </div>
  );
};

export default SelectedBlogs;
