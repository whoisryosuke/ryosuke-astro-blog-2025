import React, { type PropsWithChildren, useState } from "react";
import "./Percent.css";
import { useAnimationFrame, useScroll } from "motion/react";

type Props = {};

const Percent = ({ children }: PropsWithChildren<Props>) => {
  const { scrollYProgress } = useScroll();
  const [scrollPercent, setScrollPercent] = useState(0);

  useAnimationFrame(() => {
    setScrollPercent(Math.round(scrollYProgress.get() * 100));
  });

  return <div className="PercentWrapper">{scrollPercent}%</div>;
};

export default Percent;
