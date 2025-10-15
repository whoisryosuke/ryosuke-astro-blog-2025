import React, { useState } from "react";
import {
  motion,
  useAnimationFrame,
  useScroll,
  useTransform,
} from "motion/react";
import "./CircularProgress.css";

type Props = {
  radius?: number;
};

const CircularProgress = ({ radius = 36 }: Props) => {
  const { scrollYProgress } = useScroll();
  const [scrollPercent, setScrollPercent] = useState(0);

  useAnimationFrame(() => {
    setScrollPercent(scrollYProgress.get());
  });

  const circumference = radius * Math.PI * 2;

  //   const progress = useTransform(scrollYProgress, [0, 1], [0, circumference]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="CircularProgressContainer">
      <motion.svg
        width={radius}
        height={radius}
        viewBox={`0 0 ${radius} ${radius}`}
        className="circular-progress"
      >
        <circle className="bg"></circle>
        <motion.circle
          className="fg"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: scrollPercent }}
        ></motion.circle>
      </motion.svg>
    </div>
  );
};

export default CircularProgress;
