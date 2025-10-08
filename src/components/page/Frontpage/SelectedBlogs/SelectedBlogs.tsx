import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import Stack from "../../../primitives/Stack/Stack";
import "./SelectedBlogs.css";
import Button from "../../../primitives/Button/Button";
import { BiChevronsRight } from "react-icons/bi";
import SELECTED_BLOGS from "../../../../data/selected-blogs";
import SelectedBlogList from "./SelectedBlogList";

type Props = {};

const SelectedBlogs = (props: Props) => {
  return (
    <div className="SelectedBlogs" style={{ minHeight: "500px" }}>
      <SectionHeading title="Selected Blogs" />
      <Stack horizontal responsive>
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
        <SelectedBlogList posts={SELECTED_BLOGS} />
      </Stack>
    </div>
  );
};

export default SelectedBlogs;
