import {
  type ComponentProps,
  type HTMLProps,
  type MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import map from "../../../../utils/map";

type Props = Omit<HTMLProps<HTMLCanvasElement>, "data"> & {
  // waveform: number[];
  animated?: boolean;
  fps?: number;
  data: number[];
};

const BlogWaveformCanvas = ({ animated, fps, data, ...props }: Props) => {
  const [pressed, setPressed] = useState(false);
  const colorMode = "light";
  const bgColor = colorMode === "dark" ? "#111" : "#022727";
  const lineColor = colorMode === "dark" ? "blue" : "#80cbcc";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null,
  );
  const prevTime = useRef(0);

  const draw = useCallback(
    (now: number) => {
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

      if (animated) animationRef.current = requestAnimationFrame(draw);
    },
    [data, lineColor, bgColor, animated, fps],
  );

  const calcRelativePosition = (e: MouseEvent<any>) => {
    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const relativePos = e.clientX - canvasRect.left;
    const percent = relativePos / canvasRect.width;

    const pagePosition =
      (document.documentElement.scrollHeight - window.innerHeight) * percent;

    window.scrollTo({
      top: pagePosition,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    console.log("event", e);
    if (!canvasRef.current) return;

    calcRelativePosition(e);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [draw, lineColor, bgColor, fps]);

  const handleMouseDown: MouseEventHandler<HTMLCanvasElement> = (e) => {
    setPressed(true);
    calcRelativePosition(e);
  };

  const handleMouseUp = () => {
    setPressed(false);
  };

  const handleMouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (!pressed) return;
    console.log("mouse moving", e);
    calcRelativePosition(e);
  };

  return (
    <canvas
      ref={canvasRef}
      {...props}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  );
};

export default BlogWaveformCanvas;
