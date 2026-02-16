import React, { useState } from "react";
import { BiSidebar } from "react-icons/bi";
import styles from "./BlogTOCSidebar.module.css";
import Button from "../../../primitives/Button/Button";
import BlogTOCSidebarItem from "./BlogTOCSidebarItem";
import type { WaveformHeadingData } from "./types";

type Props = {
  width: number;
  headings: WaveformHeadingData[];
  setSelectedHeading: React.Dispatch<
    React.SetStateAction<WaveformHeadingData | null>
  >;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const BlogTOCSidebar = ({
  width,
  headings,
  setSelectedHeading,
  visible,
  setVisible,
}: Props) => {
  const handleClick = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div
      className={styles.Container}
      data-visible={visible}
      style={{ "--width": `${width}px` }}
    >
      <div className={styles.Header}>
        <h4>Chapter Markers</h4>
        <button className={styles.ToggleButton} onClick={handleClick}>
          <BiSidebar />
        </button>
      </div>
      <div className={styles.List} inert={!visible}>
        {headings.map((heading, index) => (
          <BlogTOCSidebarItem
            heading={heading}
            setSelectedHeading={setSelectedHeading}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogTOCSidebar;
