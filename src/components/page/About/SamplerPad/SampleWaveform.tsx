import {
  type ComponentProps,
  type HTMLProps,
  type MouseEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useStore } from "@nanostores/react";
import { themeStore } from "../../../../store/theme";
import map from "../../../../utils/map";
import styles from "./SamplerPad.module.css";
function easeOutBounce(x: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

const ANIM_DURATION = 420;

type Props = Omit<HTMLProps<HTMLCanvasElement>, "data"> & {
  buffer: AudioBuffer | null;
};

const SampleWaveform = ({ width, height, buffer, ...props }: Props) => {
  const [animating, setAnimating] = useState(false);
  const { colorMode } = useStore(themeStore);
  const bgColor = colorMode === "dark" ? "#022727" : "#057d7f";
  const lineColor = colorMode === "dark" ? "#80cbcc" : "#8fd2d3";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = useRef<Float32Array<ArrayBuffer>>(new Float32Array().fill(0));
  const prevData = useRef<Float32Array<ArrayBuffer>>(
    new Float32Array().fill(0),
  );
  const drawRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const prevTime = useRef(-1);
  const timer = useRef(0);

  const draw = useCallback(
    (now: number) => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // If drawing stopped, reset the prev time so first delta makes sense
      if (prevTime.current < 0) prevTime.current = now;

      // Increment timer
      const deltaTime = now - prevTime.current;
      timer.current += deltaTime;
      prevTime.current = now;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Clear drawing
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = lineColor;
      const VERTICAL_PAD = 10;
      for (let x = 0; x < canvasWidth; x++) {
        const index = Math.floor(
          map(x, 0, canvasWidth, 0, data.current.length),
        );

        // We tween between old and new based on the timer
        const oldAmplitude = prevData.current[index];
        const newAmplitude = data.current[index];
        const animation = map(timer.current, 0, ANIM_DURATION, 0, 1);
        const amplitudeDiff = newAmplitude - oldAmplitude;
        const easedTime = easeOutBounce(animation);
        const amplitude = oldAmplitude + amplitudeDiff * easedTime;
        // const amplitude = data.current[index];

        // const y = (amplitude * canvasHeight) / 1.5 + canvasHeight;
        const y = map(
          amplitude * 3,
          -1,
          1,
          0 + VERTICAL_PAD,
          canvasHeight - VERTICAL_PAD,
        );
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Sync data if we're done animating
      if (timer.current >= ANIM_DURATION) {
        setAnimating(false);
        prevData.current = data.current.slice(0);
        return;
      }

      drawRef.current = requestAnimationFrame(draw);
    },
    [buffer, lineColor, bgColor],
  );

  useEffect(() => {
    if (animating) drawRef.current = requestAnimationFrame(draw);

    return () => {
      if (drawRef.current) cancelAnimationFrame(drawRef.current);
    };
  }, [animating, draw, width, height]);

  useEffect(() => {
    // Buffer changed? Update data
    if (!buffer) return;
    const channelData = buffer.getChannelData(0);
    data.current = new Float32Array(channelData);

    // Reset timer
    timer.current = 0;
    prevTime.current = -1;

    setAnimating(true);
  }, [buffer]);

  return (
    <div className={styles.WaveformContainer}>
      <canvas ref={canvasRef} {...props} width={width} height={height} />
    </div>
  );
};

export default SampleWaveform;
