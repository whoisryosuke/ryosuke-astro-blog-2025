import React from "react";
import BlogWaveformCanvas from "./BlogWaveformCanvas";
import styles from "./BlogTOCWaveform.module.css";
import BlogWaveformPlayhead from "./BlogWaveformPlayhead";
import BlogWaveformMarkers from "./BlogWaveformMarkers";
import BlogTimelineGuide from "./BlogTimelineGuide";

type Props = {
  waveform: number[];
};

const BlogTOCWaveform = ({ waveform }: Props) => {
  console.log("waveform", waveform, Math.max(...waveform));
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <BlogTimelineGuide />
        <div className={styles.WaveformContainer}>
          <BlogWaveformCanvas data={waveform} width={420} height={100} />
          <BlogWaveformPlayhead />
        </div>
        <BlogWaveformMarkers />
      </div>
    </div>
  );
};

export default BlogTOCWaveform;
