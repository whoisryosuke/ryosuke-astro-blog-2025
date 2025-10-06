import { motion, stagger } from "motion/react";
import React from "react";

const containerAnimation = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  hover: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, color: "var(--color-black)" },
  show: { opacity: 1, color: "var(--color-black)" },
  hover: { opacity: 1, color: "var(--color-primary)" },
};

type Props = {};

const Logotype = (props: Props) => {
  // const transition = {
  //   delayChildren: stagger(0.1),
  // };

  const letters = "Ryosuke".split("").map((letter, letterIndex) => (
    <motion.span
      variants={itemAnimation}
      // whileHover={{
      //   color: "var(--color-primary)",
      // }}
      // transition={{
      //   delay: 0.01 * letterIndex,
      // }}
    >
      {letter}
    </motion.span>
  ));
  return (
    <motion.a
      variants={containerAnimation}
      initial="hidden"
      animate="show"
      whileHover="hover"
      className="Logotype"
      href="#"
    >
      {letters}
    </motion.a>
  );
};

export default Logotype;
