import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Stack from "../../../primitives/Stack/Stack";
import styles from "./WaveformBars.module.css";
import { motion } from "motion/react";
import map from "../../../../utils/map";

const BAR_COUNT = 24;

type Props = {
  analyser: AnalyserNode | null;
  fps?: number;
};

const WaveformBars = ({ analyser, fps = 20 }: Props) => {
  const [bars, setBars] = useState<number[]>([]);
  const data = useRef<Float32Array<ArrayBuffer>>(new Float32Array());
  const prevTime = useRef(0);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null,
  );
  // const bars = useMemo(() => new Array(BAR_COUNT).fill(0), []);

  const syncData = useCallback(
    (now: number) => {
      // Draw to a specific FPS if needed
      if (fps) {
        const fpsInterval = 1000 / fps;
        const elapsed = now - prevTime.current;
        // If we haven't elapsed enough time, keep looping
        if (elapsed < fpsInterval) {
          return (animationRef.current = requestAnimationFrame(syncData));
        } else {
          prevTime.current = now - (elapsed % fpsInterval);
        }
      }

      // Update waveform data as a ref
      if (analyser) {
        analyser.getFloatTimeDomainData(data.current);

        // Get bar data and update state
        const segmentSize = Math.round(data.current.length / BAR_COUNT);
        const newValues = new Array(BAR_COUNT).fill(0).map((_, index) => {
          const start = Math.ceil(index * segmentSize);
          const end = Math.floor(start + segmentSize);

          // Slice the waveform data and average it
          const slice = data.current.slice(start, end);
          const sum = slice.reduce((merge, prev) => prev + merge, 0);
          const avg = sum / slice.length;

          return avg;
        });

        setBars(newValues);
      }
      animationRef.current = requestAnimationFrame(syncData);
    },
    [analyser],
  );

  useEffect(() => {
    if (analyser) {
      const newBufferLength = analyser.frequencyBinCount;
      data.current = new Float32Array(newBufferLength);
    }

    animationRef.current = requestAnimationFrame(syncData);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [analyser, syncData]);

  const renderBars = bars.map((amplitude, index) => (
    <motion.div
      key={index}
      animate={{
        x: map(amplitude * 100, -1, 1, -10, 10),
      }}
      className={styles.Bar}
    />
  ));

  return (
    <Stack className={styles.Container}>
      <Stack>{renderBars}</Stack>
    </Stack>
  );
};

export default WaveformBars;
