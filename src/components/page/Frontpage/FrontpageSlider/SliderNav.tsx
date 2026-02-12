import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Stack from "../../../primitives/Stack/Stack";
import styles from "./FrontpageSlider.module.css";
import { ART_DATA } from "../../../../data/art";

type Props = {
  length: number;
  selectedProjectIndex: number;
  setSelectedProjectIndex: React.Dispatch<React.SetStateAction<number>>;
};

const SliderNav = ({
  length,
  selectedProjectIndex,
  setSelectedProjectIndex,
  ...props
}: Props) => {
  const next = () => {
    setSelectedProjectIndex((prev) => Math.min(prev + 1, length - 1));
  };

  const prev = () => {
    setSelectedProjectIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Stack horizontal className={styles.SliderNav}>
      <button onClick={prev}>
        <BiChevronLeft size={24} />
      </button>

      <Stack horizontal className={styles.SliderNavText}>
        <small>{selectedProjectIndex + 1}</small>
        <small>/</small>
        <small>{length}</small>
      </Stack>

      <button onClick={next}>
        <BiChevronRight size={24} />
      </button>
    </Stack>
  );
};

export default SliderNav;
