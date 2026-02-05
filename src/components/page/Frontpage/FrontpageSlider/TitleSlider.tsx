import type { CollectionEntry } from "astro:content";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import Stack from "../../../primitives/Stack/Stack";
import styles from "./FrontpageSlider.module.css";

const MotionStack = motion(Stack);

type Props = {
  projects: CollectionEntry<"projects">[];
  selectedProjectIndex: number;
  setSelectedProjectIndex: React.Dispatch<React.SetStateAction<number>>;
};

const TitleSlider = ({
  projects,
  selectedProjectIndex,
  setSelectedProjectIndex,
}: Props) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  // Update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Item width (adjust as needed)
  const itemWidth = 200;
  const gap = 20;

  // Calculate the offset needed to center the active item
  const calculateOffset = (index: number) => {
    const itemPosition = index * (itemWidth + gap);
    const centerOffset = containerWidth / 2 - itemWidth / 2;
    return centerOffset - itemPosition;
  };

  // Animate to centered position when active index changes
  useEffect(() => {
    if (containerWidth > 0 && !isDragging) {
      const targetX = calculateOffset(selectedProjectIndex);
      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    }
  }, [selectedProjectIndex, containerWidth, isDragging]);

  // Handle drag end to snap to nearest item
  const handleDragEnd = () => {
    setIsDragging(false);

    // Get the current x position
    const currentX = x.get();

    // Find which index would be centered at this x position
    let closestIndex = selectedProjectIndex;
    let smallestDiff = Infinity;

    for (let i = 0; i < projects.length; i++) {
      const targetX = calculateOffset(i);
      const diff = Math.abs(currentX - targetX);

      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestIndex = i;
      }
    }

    setSelectedProjectIndex(closestIndex);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  // Scale transform for items based on distance from center
  const itemScale = (index: number) => {
    return useTransform(x, (value) => {
      const targetX = calculateOffset(index);
      const distance = Math.abs(value - targetX);
      const scale = Math.max(0.8, 1 - distance / 1000);
      return scale;
    });
  };

  // Opacity transform for items
  const itemOpacity = (index: number) => {
    return useTransform(x, (value) => {
      const targetX = calculateOffset(index);
      const distance = Math.abs(value - targetX);
      const opacity = Math.max(0.3, 1 - distance / 800);
      return opacity;
    });
  };

  return (
    <Stack horizontal className={styles.TitleSlider} ref={containerRef}>
      <MotionStack
        horizontal
        className="slider-track"
        drag="x"
        dragElastic={0.2}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ x }}
      >
        {projects.map((item, index) => (
          <motion.div
            key={index}
            className={`slider-item ${index === selectedProjectIndex ? "active" : ""}`}
            style={{
              scale: itemScale(index),
              opacity: itemOpacity(index),
              width: itemWidth,
            }}
            onClick={() => !isDragging && setSelectedProjectIndex(index)}
          >
            {item.data.title}
          </motion.div>
        ))}
      </MotionStack>
    </Stack>
  );
};

export default TitleSlider;
