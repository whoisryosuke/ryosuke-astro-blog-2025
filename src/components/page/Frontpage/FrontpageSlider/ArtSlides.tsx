import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./FrontpageSlider.module.css";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import Stack from "../../../primitives/Stack/Stack";
import { ART_DATA } from "../../../../data/art";

const SLIDE_GAP = 20;

const MotionStack = motion.create(Stack);

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
  const centerOffset = containerWidth / 2 - slideSize.current / 2;

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
        const containerLeft = containerRef.current.getBoundingClientRect().left;
        setContainerWidth(window.innerWidth - containerLeft);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Calculate the offset needed to center the active item
  const calculateOffset = (index: number) => {
    // We figure out the slide position if it was placed on left side
    const offset = index * (slideSize.current + SLIDE_GAP);
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

  const getClosestByDistance = (currentX: number) => {
    // Find which index would be centered at this x position
    const centeredX = -currentX + centerOffset;
    const fullSlideSize = slideSize.current + SLIDE_GAP;
    const closestIndex = Math.min(
      Math.max(Math.round(centeredX / fullSlideSize), 0),
      ART_DATA.length - 1,
    );

    return closestIndex;
  };

  // Handle drag end to snap to nearest item
  const handleDragEnd = () => {
    setIsDragging(false);

    // Get the current x position
    const currentX = x.get();
    const closestIndex = getClosestByDistance(currentX);

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

  // Opacity transform for items
  const itemOpacity = (index: number) => {
    return useTransform(x, (value) => {
      const targetX = calculateOffset(index);
      const distance = Math.abs(value - targetX);
      const opacity = Math.max(0.3, 1 - distance / 800);
      return opacity;
    });
  };

  const handleScroll = (event) => {
    // Determine scroll direction and amount
    const scrollAmountY = event.deltaY * -10;

    const currentX = x.get();
    const targetX = currentX + scrollAmountY;

    const closestIndex = getClosestByDistance(targetX);
    setSelectedProjectIndex(closestIndex);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.addEventListener("wheel", handleScroll);

    return () => {
      containerRef.current?.removeEventListener("wheel", handleScroll);
    };
  }, []);

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
        style={{ x, gap: SLIDE_GAP }}
      >
        {ART_DATA.map((item, index) => (
          <motion.div
            key={index}
            id={index.toString()}
            className={styles.ArtSlide}
            data-active={index === selectedProjectIndex}
            style={{
              // scale: itemScale(index),
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
