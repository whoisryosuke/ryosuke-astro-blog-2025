import { motion, useScroll, useTransform } from "motion/react";
import React from "react";
import styles from "./BlogWaveformPlayhead.module.css";
import BlogWaveformPlayheadIcon from "../../../icons/BlogWaveformPlayheadIcon";

type Props = {};

const BlogWaveformPlayhead = (props: Props) => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(() => scrollYProgress.get() * 420);

  return (
    <div className={styles.Container} data-clickthrough={true}>
      <motion.div
        className={styles.Playhead}
        style={{
          x,
        }}
      >
        <BlogWaveformPlayheadIcon />
      </motion.div>
    </div>
  );
};

export default BlogWaveformPlayhead;
