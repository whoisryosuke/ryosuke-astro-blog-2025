import React from "react";
import BlogWaveformCanvas from "./BlogWaveformCanvas";
import styles from "./BlogTOCWaveform.module.css";
import BlogWaveformPlayhead from "./BlogWaveformPlayhead";
import BlogWaveformMarkers from "./BlogWaveformMarkers";

type Props = {
  waveform: number[];
};

const BlogTOCWaveform = ({ waveform }: Props) => {
  console.log("waveform", waveform, Math.max(...waveform));
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <BlogWaveformCanvas data={waveform} width={420} height={150} />
        <BlogWaveformPlayhead />
        <BlogWaveformMarkers />
      </div>
    </div>
  );
};

export default BlogTOCWaveform;
