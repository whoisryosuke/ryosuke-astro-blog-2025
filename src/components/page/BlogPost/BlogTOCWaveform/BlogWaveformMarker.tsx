import React from "react";
import type { WaveformHeadingData } from "./types";
import { BsCaretDownFill } from "react-icons/bs";
import map from "../../../../utils/map";
import styles from "./BlogTOCWaveform.module.css";
import { Tooltip } from "@base-ui/react/tooltip";
import BlogWaveformMarkerIcon from "../../../icons/BlogWaveformMarkerIcon";

type Props = {
  width: number;
  heading: WaveformHeadingData;
  pageSize: number;
  handle: Tooltip.Handle<string>;
  setSelectedHeading: React.Dispatch<
    React.SetStateAction<WaveformHeadingData | null>
  >;
};

const BlogWaveformMarker = ({
  width,
  heading,
  pageSize,
  handle,
  setSelectedHeading,
}: Props) => {
  // The position is a proportional calc based on page size vs this waveform size
  // but we also subtract half the width of the icon to center it (e.g. `8`)
  const x = map(heading.y, 0, pageSize, 0, width) - 12;

  const selectHeading = () => {
    setSelectedHeading(heading);
  };

  return (
    <Tooltip.Trigger
      id={heading.id}
      aria-label="Bold"
      className={styles.Button}
      handle={handle}
      render={(props) => (
        <a
          {...props}
          href={`#${heading.id}`}
          className={styles.Marker}
          style={{ "--x": `${x}px` }}
          onClick={selectHeading}
          onMouseOver={selectHeading}
          onFocus={selectHeading}
        />
      )}
    >
      <BlogWaveformMarkerIcon />
    </Tooltip.Trigger>
  );
};

export default BlogWaveformMarker;
