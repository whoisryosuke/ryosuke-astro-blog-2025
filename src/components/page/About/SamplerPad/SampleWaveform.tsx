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
  buffer: AudioBuffer | null;
};

const SampleWaveform = ({ width, height, buffer, ...props }: Props) => {
  const { colorMode } = useStore(themeStore);
  const bgColor = colorMode === "dark" ? "#022727" : "hsl(180, 80%, 20%)";
  const lineColor = colorMode === "dark" ? "#80cbcc" : "hsl(181, 43%, 75%)";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    if (!buffer) return;
    const data = buffer.getChannelData(0);

    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
    for (let i = 0; i < canvasWidth; i++) {
      const index = Math.floor(map(i, 0, canvasWidth, 0, data.length));
      const x = i;
      const amplitude = data[index];
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

    // if (animated) animationRef.current = requestAnimationFrame(draw);
  }, [buffer, lineColor, bgColor]);

  useEffect(() => {
    draw();
  }, [draw, width, height]);

  return <canvas ref={canvasRef} {...props} width={width} height={height} />;
};

export default SampleWaveform;
