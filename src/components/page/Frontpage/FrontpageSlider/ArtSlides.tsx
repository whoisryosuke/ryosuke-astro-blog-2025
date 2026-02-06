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
  const slideSize = useRef(0);
  const x = useMotionValue(0);
  // Gets center of screen then figures out where centered slide would start
  // I'm skeptical here, because centered is technically 1/2 -- but 1/4 works.
  // I'm thinking retina is throwing things off somehow with it's 2x multiplier.
  const centerOffset = containerWidth / 4 - slideSize.current / 2;

  // Get slide size when window resizes
  useLayoutEffect(() => {
    if (containerWidth > 0 && containerRef.current) {
      // Get size of a slide for use later
      const firstEl = containerRef.current.children
        .item(0)
        ?.children.item(0) as HTMLDivElement;
      slideSize.current = firstEl?.offsetWidth ?? 0;
    }
  }, [containerWidth]);

  // Update container width on mount and resize
  useLayoutEffect(() => {
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
    // We figure out the slide position if it was placed on left side
    const offset = index * (slideSize.current + gap);
    // Then shift it to the center
    return -offset + centerOffset;
  };

  // Animate to centered position when active index changes
  useEffect(() => {
    if (containerWidth > 0 && !isDragging) {
      const targetX = calculateOffset(selectedProjectIndex);
      console.log("clicked - scroll to ", targetX);
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
    const centeredX = -currentX + centerOffset;
    const fullSlideSize = slideSize.current + gap;
    const closestIndex = Math.min(
      Math.max(Math.round(centeredX / fullSlideSize), 0),
      ART_DATA.length - 1,
    );
    // console.log("closestIndex", {
    //   closestIndex,
    //   currentX,
    //   selectedProjectIndex,
    //   slideSize: slideSize.current,
    // });

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
            key={index}
            id={index.toString()}
            className={styles.ArtSlide}
            data-active={index === selectedProjectIndex}
            style={{
              scale: itemScale(index),
              opacity: itemOpacity(index),
            }}
            onClick={() => !isDragging && setSelectedProjectIndex(index)}
          >
            <img src={`./images/art-slides/${item.image}`} draggable={false} />
          </motion.div>
        ))}
      </MotionStack>
    </div>
  );
};

export default ArtSlides;
