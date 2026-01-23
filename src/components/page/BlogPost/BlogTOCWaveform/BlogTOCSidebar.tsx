import React, { useState } from "react";
import { BiSidebar } from "react-icons/bi";
import styles from "./BlogTOCSidebar.module.css";
import Button from "../../../primitives/Button/Button";
import BlogTOCSidebarItem from "./BlogTOCSidebarItem";
import type { WaveformHeadingData } from "./types";

type Props = {
  headings: WaveformHeadingData[];
  setSelectedHeading: React.Dispatch<
    React.SetStateAction<WaveformHeadingData | null>
  >;
};

const BlogTOCSidebar = ({ headings, setSelectedHeading }: Props) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className={styles.Container} data-visible={visible}>
      <div className={styles.Header}>
        <h4>Chapter Markers</h4>
        <button className={styles.ToggleButton} onClick={handleClick}>
          <BiSidebar />
        </button>
      </div>
      <div className={styles.List}>
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
