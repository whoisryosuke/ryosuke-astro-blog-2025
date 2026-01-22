import React from "react";
import type { WaveformHeadingData } from "./types";
import { BsCaretDownFill } from "react-icons/bs";
import map from "../../../../utils/map";
import styles from "./BlogTOCWaveform.module.css";

type Props = { heading: WaveformHeadingData; pageSize: number };

const BlogWaveformMarker = ({ heading, pageSize }: Props) => {
  // The position is a proportional calc based on page size vs this waveform size
  // but we also subtract half the width of the icon to center it (e.g. `8`)
  const x = map(heading.y, 0, pageSize, 0, 420) - 8;
  console.log("heading", heading.title, x);

  return (
    <a
      href={`#${heading.id}`}
      title={heading.title}
      className={styles.Marker}
      style={{ "--x": `${x}px` }}
    >
      <BsCaretDownFill />
    </a>
  );
};

export default BlogWaveformMarker;
