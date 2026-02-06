import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./FrontpageSlider.module.css";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import Stack from "../../../primitives/Stack/Stack";
import { ART_DATA } from "../../../../data/art";

const MotionStack = motion(Stack);

type Props = {
  selectedProjectIndex: number;
  setSelectedProjectIndex: React.Dispatch<React.SetStateAction<number>>;
};

const ArtSlides = ({
  selectedProjectIndex,
  setSelectedProjectIndex,
}: Props) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const x = useMotionValue(0);

  // Initialize position on mount
  useLayoutEffect(() => {
    if (containerWidth > 0 && itemRefs.current[selectedProjectIndex]) {
      const targetX = calculateOffset(selectedProjectIndex);
      x.set(targetX); // Set immediately without animation on mount
    }
  }, [containerWidth]); // Only run when containerWidth changes from 0

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

  const gap = 20;

  // Calculate the offset needed to center the active item
  const calculateOffset = (index: number) => {
    if (!itemRefs.current[index]) return 0;

    let totalWidthBefore = 0;
    for (let i = 0; i < index; i++) {
      if (itemRefs.current[i]) {
        totalWidthBefore +=
          itemRefs.current[i].getBoundingClientRect().width + gap;
      }
    }
    // Just return the negative position - no need to add centerOffset
    // because justify-content: center is already handling that
    return -totalWidthBefore;
  };

  // Animate to centered position when active index changes
  useEffect(() => {
    if (containerWidth > 0 && !isDragging) {
      const targetX = calculateOffset(selectedProjectIndex);
      animate(x, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 50,
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

    for (let i = 0; i < ART_DATA.length; i++) {
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
    <div ref={containerRef} className={styles.ProjectPreview}>
      <MotionStack
        horizontal
        className={styles.ArtSlideContainer}
        drag="x"
        dragElastic={0.2}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ x, gap }}
      >
        {ART_DATA.map((item, index) => (
          <motion.div
            ref={(el) => {
              if (el) {
                itemRefs.current[index] = el;
              }
            }}
            key={index}
            className={styles.ArtSlide}
            data-active={index === selectedProjectIndex}
            style={{
              scale: itemScale(index),
              opacity: itemOpacity(index),
            }}
            onClick={() => !isDragging && setSelectedProjectIndex(index)}
          >
            <img src={`./images/art-slides/${item.image}`} />
          </motion.div>
        ))}
      </MotionStack>
    </div>
  );
};

export default ArtSlides;
