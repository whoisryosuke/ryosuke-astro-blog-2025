import { motion, useInView, useScroll, useTransform } from "motion/react";
import React, { useRef, type HTMLElementType, type HTMLProps } from "react";
import "./SectionHeading.css";

type Props = HTMLProps<HTMLDivElement> & {
  title: string;
  small?: boolean;
};

const SectionHeading = ({ title, small, className, ...props }: Props) => {
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

  const HeadingComponent = small ? "h2" : "h1";

  return (
    <motion.div
      ref={elRef}
      animate={{
        x: inView ? -100 : -160,
      }}
      className={`SectionHeading ${small ?? "small"} ${className}`}
      {...props}
    >
      <motion.div
        className="selected-tab"
        animate={{
          backgroundColor: inView
            ? "var(--color-secondary)"
            : "var(--color-light-gray)",
        }}
      />
      <HeadingComponent>{title}</HeadingComponent>
    </motion.div>
  );
};

export default SectionHeading;
