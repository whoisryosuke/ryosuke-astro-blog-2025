import { motion, useScroll, useTransform } from "motion/react";
import React from "react";
import styles from "./BlogWaveformPlayhead.module.css";
import BlogWaveformPlayheadIcon from "../../../icons/BlogWaveformPlayheadIcon";

type Props = { width: number };

const BlogWaveformPlayhead = ({ width }: Props) => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(() => scrollYProgress.get() * width);

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
