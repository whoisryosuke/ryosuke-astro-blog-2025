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
      <BlogWaveformCanvas data={waveform} width={420} height={200} />
      <BlogWaveformPlayhead />
      <BlogWaveformMarkers />
    </div>
  );
};

export default BlogTOCWaveform;
