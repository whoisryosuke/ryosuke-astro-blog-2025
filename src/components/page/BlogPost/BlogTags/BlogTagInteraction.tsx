import {
  type ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Stack from "../../../primitives/Stack/Stack";
import BlogTag from "./BlogTag";
import "./BlogTagInteraction.css";
import BlogPostTitle from "../BlogPostTitle/BlogPostTitle";

type Props = {
  tags: string[];
};

const BlogTagInteraction = ({ tags, ...props }: Props) => {
  const bgColor = "#80cbcc";
  const lineColor = "#626263";

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = useRef<Uint8Array>(new Uint8Array(0));
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tagsRef = useRef<HTMLAnchorElement[]>([]);
  const prevTime = useRef(0);

  // Graphics settings

  const draw = useCallback(
    (now: number) => {
      if (!canvasRef.current || !containerRef.current) return;
      const canvas = canvasRef.current;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Clear drawing
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const containerPosition = containerRef.current.getBoundingClientRect();

      tagsRef.current.forEach((tag) => {
        const position = tag.getBoundingClientRect();
        const relativePosition = {
          top: position.top - containerPosition.top,
          left: position.left - containerPosition.left,
        };
        const x = relativePosition.left + position.width / 2;
        const y = relativePosition.top + 10;

        let cp1 = { x: 230, y: 30 };
        let cp2 = { x: 150, y: 80 };
        ctx.lineWidth = 1;
        ctx.beginPath(); // Start a new path
        ctx.moveTo(canvasWidth / 2, 160); // Move the pen to (30, 50)
        // ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, x, relativePosition.top);
        ctx.lineTo(x, y); // Draw a line to (150, 100)
        ctx.stroke(); // Render the path
      });

      animationRef.current = requestAnimationFrame(draw);
    },
    [data, lineColor, bgColor]
  );

  const handleResize = () => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth;
    // canvasRef.current.height = Math.min(window.innerWidth / 1.62, 420);
    canvasRef.current.height = 420;
  };

  //   const handleMouse = (e: MouseEvent) => {
  //     mousePos.current = { x: e.clientX, y: e.clientY };
  //   };
  //   const handleMouseEnter = () => {
  //     isMouseHovering.current = true;
  //   };
  //   const handleMouseLeave = () => {
  //     isMouseHovering.current = false;
  //   };

  useEffect(() => {
    handleResize();
    animationRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", handleResize);
    // window.addEventListener("mousemove", handleMouse);
    // containerRef.current?.addEventListener("mouseenter", handleMouseEnter);
    // containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      //   containerRef.current?.removeEventListener("mousemove", handleMouse);
      //   containerRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      // containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [draw, lineColor, bgColor]);

  return (
    <div ref={containerRef} className="BlogTagInteraction">
      <BlogPostTitle title="Looking for something?" />
      <canvas
        ref={canvasRef}
        className="canvas"
        width="100%"
        height="420px"
        {...props}
      />
      <div className="tags">
        <Stack horizontal className="stack">
          {tags.map((tag) => (
            <BlogTag
              ref={(ref) => {
                ref && tagsRef.current.push(ref);
              }}
              tag={tag}
            />
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default BlogTagInteraction;
