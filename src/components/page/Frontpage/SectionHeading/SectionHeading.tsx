import { motion, useInView, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";
import "./SectionHeading.css";

type Props = {
  title: string;
};

const SectionHeading = ({ title, ...props }: Props) => {
  const elRef = useRef<HTMLDivElement>(null);

  const inView = useInView(elRef, {
    margin: "-200px 0px -600px 0px",
    // margin: "auto 0 auto 0", // This is crucial!
  });

  //   const { scrollYProgress } = useScroll({
  //     target: elRef,
  //     offset: ["start 0.5", "end end"],
  //   });
  //   // Takes the scroll progress (0 to 1) and maps it to `0-1-0` so we
  //   // scale up and back down (or "ping-pong")
  //   const x = useTransform(scrollYProgress, [0, 1, 0], [-160, -100, -160]);

  return (
    <motion.div
      ref={elRef}
      animate={{
        x: inView ? -100 : -160,
      }}
      className="SectionHeading"
    >
      <motion.div
        className="selected-tab"
        animate={{
          backgroundColor: inView
            ? "var(--color-secondary)"
            : "var(--color-light-gray)",
        }}
      />
      <h1>{title}</h1>
    </motion.div>
  );
};

export default SectionHeading;
