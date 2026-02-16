import React, { useState } from "react";
import styles from "./BlogWaveformInput.module.css";

type Props = {};

const BlogWaveformInput = (props: Props) => {
  const [value, setValue] = useState(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    setValue(value);

    // Scroll page
    const percent = value / 100;
    const pagePosition =
      (document.documentElement.scrollHeight - window.innerHeight) * percent;

    window.scrollTo({
      top: pagePosition,
    });
  };
  return (
    <input
      className={styles.Input}
      type="range"
      min={0}
      max={100}
      step={0.1}
      value={value}
      onChange={handleChange}
    />
  );
};

export default BlogWaveformInput;
