import React from "react";
import map from "../../../../utils/map";
import styles from "./BlogCommentBars.module.css";
import Stack from "../../../primitives/Stack/Stack";

type Props = {
  waveform: number[];
};

const BAR_COUNT = 100;

const BlogCommentBars = ({ waveform }: Props) => {
  const bars = new Array(BAR_COUNT).fill(0);
  const renderBars = bars.map((_, barIndex) => {
    const waveformIndex = Math.floor(
      map(barIndex, 0, BAR_COUNT, 0, waveform.length),
    );
    const data = (waveform[waveformIndex] + 1) * 100;

    return <div className={styles.Bar} style={{ height: data }} />;
  });
  return (
    <Stack horizontal gap="2px" className={styles.Container}>
      {renderBars}
    </Stack>
  );
};

export default BlogCommentBars;
