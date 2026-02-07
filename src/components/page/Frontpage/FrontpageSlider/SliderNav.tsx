import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Stack from "../../../primitives/Stack/Stack";
import styles from "./FrontpageSlider.module.css";
import { ART_DATA } from "../../../../data/art";

type Props = {
  selectedProjectIndex: number;
  setSelectedProjectIndex: React.Dispatch<React.SetStateAction<number>>;
};

const SliderNav = ({
  selectedProjectIndex,
  setSelectedProjectIndex,
  ...props
}: Props) => {
  const next = () => {
    setSelectedProjectIndex((prev) => Math.min(prev + 1, ART_DATA.length - 1));
  };

  const prev = () => {
    setSelectedProjectIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Stack horizontal className={styles.SliderNav}>
      <button onClick={prev}>
        <BiChevronLeft />
      </button>
      <small>{selectedProjectIndex + 1}</small>
      <small>/</small>
      <small>{ART_DATA.length}</small>
      <button onClick={next}>
        <BiChevronRight />
      </button>
    </Stack>
  );
};

export default SliderNav;
