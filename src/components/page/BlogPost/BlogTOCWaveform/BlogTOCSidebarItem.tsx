import React from "react";
import BlogWaveformMarkerIcon from "../../../icons/BlogWaveformMarkerIcon";
import styles from "./BlogTOCSidebarItem.module.css";
import type { HeadingData } from "../BlogTOCReadTracker/TableOfContents/types";
import type { WaveformHeadingData } from "./types";

type Props = {
  heading: WaveformHeadingData;
  setSelectedHeading: React.Dispatch<
    React.SetStateAction<WaveformHeadingData | null>
  >;
};

const BlogTOCSidebarItem = ({ heading, setSelectedHeading }: Props) => {
  const selectHeading = () => {
    setSelectedHeading(heading);
  };
  return (
    <a href={`#${heading.id}`} className={styles.Button}>
      <BlogWaveformMarkerIcon />
      <span
        dangerouslySetInnerHTML={{
          __html: heading.title,
        }}
      />
    </a>
  );
};

export default BlogTOCSidebarItem;
