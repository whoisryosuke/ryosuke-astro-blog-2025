import React, { useCallback, useState } from "react";
import styles from "./BlogWaveformInput.module.css";
import throttle from "../../../../utils/throttle";

type Props = {};

const BlogWaveformInput = (props: Props) => {
  const [value, setValue] = useState(0);

  const scrollTo = (value: number) => {
    // Scroll page
    const percent = value / 100;
    const pagePosition =
      (document.documentElement.scrollHeight - window.innerHeight) * percent;

    window.scrollTo({
      top: pagePosition,
    });
  };

  const throttledScrollTo = useCallback(throttle(scrollTo, 200), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    setValue(value);

    throttledScrollTo(value);
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
