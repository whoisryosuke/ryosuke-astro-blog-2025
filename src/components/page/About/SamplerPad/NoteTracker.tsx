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
import type { NoteHistory } from "./types";

type Props = Omit<HTMLProps<HTMLCanvasElement>, "data"> & {
  noteHistory: NoteHistory;
  playerState: {
    playing: boolean;
    time: number;
  };
};

const NoteTracker = ({
  width,
  height,
  noteHistory,
  playerState,
  ...props
}: Props) => {
  const { colorMode } = useStore(themeStore);
  const bgColor = colorMode === "dark" ? "#022727" : "hsl(180, 80%, 20%)";
  const lineColor = colorMode === "dark" ? "#80cbcc" : "hsl(181, 43%, 75%)";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null,
  );

  const draw = useCallback(() => {
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

    ctx.strokeStyle = lineColor;

    const animatedX = (playerState.time / 4200) * canvasWidth;
    ctx.beginPath();
    ctx.moveTo(animatedX, 0);
    ctx.lineTo(animatedX, canvasHeight);
    ctx.stroke();

    if (playerState.playing) animationRef.current = requestAnimationFrame(draw);
  }, [playerState, lineColor, bgColor]);

  useEffect(() => {
    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [draw, playerState.playing]);

  return <canvas ref={canvasRef} {...props} width={width} height={height} />;
};

export default NoteTracker;
