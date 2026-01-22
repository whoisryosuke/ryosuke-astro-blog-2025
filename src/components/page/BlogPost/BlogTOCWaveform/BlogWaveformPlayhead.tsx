import { motion, useScroll, useTransform } from "motion/react";
import React from "react";
import styles from "./BlogWaveformPlayhead.module.css";

type Props = {};

const BlogWaveformPlayhead = (props: Props) => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(() => scrollYProgress.get() * 420);

  return (
    <div className={styles.Container}>
      <motion.div
        className={styles.Playhead}
        style={{
          x,
        }}
      ></motion.div>
    </div>
  );
};

export default BlogWaveformPlayhead;
