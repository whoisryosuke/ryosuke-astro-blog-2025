import {
  type ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import map from "../../../../utils/map";

function easeOutQuart(x: number) {
  return 1 - Math.pow(1 - x, 4);
}
function easeInOutSine(x: number) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

type Particle = {
  time: number;
  x: number;
  y: number;
};
type Particles = Particle[];

type AstroImage =
  | {
      src: string;
      width: number;
      height: number;
      format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
    }
  | undefined;
type Props = {
  image: AstroImage;
};

const BlogPostTitleBG = ({ image, ...props }: Props) => {
  //   const { colorMode } = useColorMode();
  //   const defaultBgColor = colorMode === "dark" ? "#111" : "#EEE";
  //   const bgColor =
  //     color in CUSTOM_COLORS
  //       ? colorMode === "dark"
  //         ? CUSTOM_COLORS[color].bg.dark
  //         : CUSTOM_COLORS[color].bg.light
  //       : defaultBgColor;
  //   const lineColor = color in CUSTOM_COLORS ? CUSTOM_COLORS[color].line : color;

  const bgColor = "#ceccc5";
  const lineColor = "#626263";

  // const [mousePos, setMousePos] = useState();

  const mousePos = useRef({ x: 0, y: 0 });
  const isMouseHovering = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = useRef<Uint8Array>(new Uint8Array(0));
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const prevTime = useRef(0);
  const particles = useRef<Particles>([]);

  // Graphics settings
  const radius = 2;
  const padding = 40;
  const initialPadding = 0;
  const circleSpacing = radius * 2 + padding;
  const animationDuration = 3 * 1000;

  const draw = useCallback(
    (now: number) => {
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

      const circlesPerRow = Math.ceil(canvasWidth / circleSpacing);
      const circlesPerCol = Math.floor(canvasHeight / circleSpacing);
      const animationBase = Math.max(easeInOutSine(Math.sin(now / 1000)), 0.1);

      const localTime = Date.now();

      for (let row = 0; row < circlesPerRow; row++) {
        for (let col = 0; col < circlesPerCol; col++) {
          ctx.beginPath();
          ctx.lineWidth = 3.5;
          ctx.strokeStyle = lineColor;
          ctx.fillStyle = lineColor;

          const x = row * circleSpacing + initialPadding;
          const y = col * circleSpacing + initialPadding;

          // Detect mouse
          const distance = {
            x: Math.abs(mousePos.current.x - x),
            y: Math.abs(mousePos.current.y - y),
          };
          const combinedDistance = distance.x + distance.y;
          const selected = combinedDistance < 100;
          const highlighted = particles.current.find(
            (particle) => particle.x == row && particle.y == col
          );

          // Particle highlight animation
          let particleScaleAnimation = 1;
          if (highlighted) {
            const animationTime = localTime - highlighted.time;
            // Start phase
            if (animationTime <= animationDuration / 2) {
              particleScaleAnimation =
                easeOutQuart(
                  map(
                    localTime,
                    highlighted.time,
                    highlighted.time + animationDuration / 2,
                    0,
                    1
                  )
                ) *
                  2 +
                1;
            } else {
              // End phase
              particleScaleAnimation =
                easeOutQuart(
                  map(
                    localTime,
                    highlighted.time + animationDuration,
                    highlighted.time + animationDuration / 2,
                    0,
                    1
                  )
                ) *
                  2 +
                1;
              console.log(
                "end",
                particleScaleAnimation,
                localTime,
                localTime - highlighted.time + animationDuration
              );
            }
          }

          const circleIncrease = map(combinedDistance, 0, 100, 0, 3);

          const animatedRadius = selected
            ? radius * circleIncrease
            : radius * particleScaleAnimation;

          ctx.arc(x, y, animatedRadius, 0, 2 * Math.PI);
          //   ctx.stroke();
          ctx.fill();
        }
      }

      // Draw image
      if (imageRef.current && isMouseHovering.current) {
        ctx.drawImage(
          imageRef.current,
          mousePos.current.x,
          mousePos.current.y,
          400,
          400 * 0.52
        );
      }

      animationRef.current = requestAnimationFrame(draw);
    },
    [data, lineColor, bgColor]
  );

  const createParticle = () => {
    const now = Date.now();
    // Create particle
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const circlesPerRow = Math.ceil(canvasWidth / circleSpacing);
    const circlesPerCol = Math.floor(canvasHeight / circleSpacing);
    const totalParticles = circlesPerRow + circlesPerCol;
    const randomX = Math.floor(Math.random() * circlesPerRow);
    const randomY = Math.floor(Math.random() * circlesPerCol);

    // Refresh timer
    const newParticle: Particle = {
      time: now,
      x: randomX,
      y: randomY,
    };

    console.log("new particle", newParticle);

    particles.current.push(newParticle);
  };

  const generateParticle = () => {
    // Cleanup particles
    const now = Date.now();
    particles.current = particles.current.filter(
      (particle) => particle.time + animationDuration > now
    );

    // Create particle
    for (let index = 0; index < 10; index++) {
      createParticle();
    }
  };

  const handleResize = () => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerWidth / 3.62;
  };

  const handleMouse = (e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseEnter = () => {
    isMouseHovering.current = true;
  };
  const handleMouseLeave = () => {
    isMouseHovering.current = false;
  };

  useEffect(() => {
    handleResize();
    animationRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);
    containerRef.current?.addEventListener("mouseenter", handleMouseEnter);
    // containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    intervalRef.current = setInterval(generateParticle, 420);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      containerRef.current?.removeEventListener("mousemove", handleMouse);
      containerRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      // containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [draw, lineColor, bgColor]);

  return (
    <div ref={containerRef} className="BlogPostTitleBGContainer">
      <canvas
        ref={canvasRef}
        className="BlogPostTitleBG"
        width="100%"
        height="400px"
        {...props}
      />
      <div className="BlogPostTitleBGOverlay" />
      <img ref={imageRef} src={image?.src ?? ""} style={{ display: "none" }} />
    </div>
  );
};

export default BlogPostTitleBG;
