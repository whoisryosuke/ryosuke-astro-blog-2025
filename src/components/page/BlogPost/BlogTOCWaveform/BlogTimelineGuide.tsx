import React from "react";
import styles from "./BlogTimelineGuide.module.css";

const GuideLine = (props) => {
  return <div className={styles.GuideLine} {...props} />;
};

type Props = {};

const BlogTimelineGuide = (props: Props) => {
  const lines = new Array(20).fill(0);
  const renderLines = lines.map((_, index) => (
    <GuideLine
      key={index}
      data-long={
        index == 0 ||
        index == Math.floor(lines.length / 2) ||
        index == lines.length - 1
      }
    />
  ));

  return (
    <div className={styles.Container}>
      <div className={styles.Numbers}>
        <span>00:00:00</span>
        <span>00:02:10</span>
        <span>00:04:20</span>
      </div>
      <div className={styles.Lines}>{renderLines}</div>
    </div>
  );
};

export default BlogTimelineGuide;
