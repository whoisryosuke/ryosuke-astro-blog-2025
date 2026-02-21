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

type Props = Omit<HTMLProps<HTMLCanvasElement>, "data"> & {
  audioCtx: AudioContext | null;
  // waveform: number[];
  animated?: boolean;
  fps?: number;
  // data: number[];
  analyser: AnalyserNode | null;
};

const SampleWaveform = ({
  animated = true,
  fps,
  width,
  height,
  audioCtx,
  analyser,
  ...props
}: Props) => {
  const [pressed, setPressed] = useState(false);
  const data = useRef<Float32Array<ArrayBuffer>>(new Float32Array());
  const { colorMode } = useStore(themeStore);
  const bgColor = colorMode === "dark" ? "#022727" : "hsl(180, 80%, 20%)";
  const lineColor = colorMode === "dark" ? "#80cbcc" : "hsl(181, 43%, 75%)";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null,
  );
  const prevTime = useRef(0);
  const containerCache = useRef<DOMRect | null>(null);

  const draw = useCallback(
    (now: number) => {
      console.log("drawing", analyser);
      // Draw to a specific FPS if needed
      if (fps && animated) {
        const fpsInterval = 1000 / fps;
        const elapsed = now - prevTime.current;
        // If we haven't elapsed enough time, keep looping
        if (elapsed < fpsInterval) {
          return (animationRef.current = requestAnimationFrame(draw));
        } else {
          prevTime.current = now - (elapsed % fpsInterval);
        }
      }

      // Update waveform data as a ref
      if (analyser) {
        analyser.getFloatTimeDomainData(data.current);
        console.log("waveform data", data.current);
      }

      if (!canvasRef.current) return;
      const canvas = canvasRef.current;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Get audio data
      // if (!data.current) return;

      // Clear drawing
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = lineColor;
      const VERTICAL_PAD = 10;
      for (let i = 0; i < canvasWidth; i++) {
        const index = Math.floor(
          map(i, 0, canvasWidth, 0, data.current.length),
        );
        const x = i;
        const amplitude = data.current[index];
        // const y = (amplitude * canvasHeight) / 1.5 + canvasHeight;
        const y = map(
          amplitude,
          -1,
          1,
          0 + VERTICAL_PAD,
          canvasHeight - VERTICAL_PAD,
        );
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      if (animated) animationRef.current = requestAnimationFrame(draw);
    },
    [analyser, lineColor, bgColor, animated, fps],
  );

  useEffect(() => {
    if (analyser) {
      const newBufferLength = analyser.frequencyBinCount;
      data.current = new Float32Array(newBufferLength);
    }

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [analyser, draw]);

  return <canvas ref={canvasRef} {...props} width={width} height={height} />;
};

export default SampleWaveform;
