import type { CollectionEntry } from "astro:content";
import {
  animate,
  isBrowser,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import Stack from "../../../primitives/Stack/Stack";
import styles from "./FrontpageSlider.module.css";

const SLIDE_WIDTH = 420;
const SLIDE_GAP = 0;

const MotionStack = motion(Stack);

type TitleData = {
  id: string;
  title: string;
};

type Props = {
  titles: TitleData[];
  selectedProjectIndex: number;
  setSelectedProjectIndex: React.Dispatch<React.SetStateAction<number>>;
};

const TitleSlider = ({
  titles,
  selectedProjectIndex,
  setSelectedProjectIndex,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLButtonElement[]>([]);
  const x = useMotionValue(0);

  // Calculate the offset needed to center the active item
  const calculateOffset = (index: number, center: boolean = false) => {
    const itemLeft = itemRefs.current[index]?.offsetLeft ?? 0;
    const itemWidth = itemRefs.current[index]?.offsetWidth ?? 1;
    const screenCenter = isBrowser ? window.innerWidth / 2 : 1;

    let offset = itemLeft;

    // Then shift it to the center
    if (center) {
      offset = itemLeft - screenCenter + itemWidth / 2;
    }

    return -offset;
  };

  // Animate to centered position when active index changes
  useEffect(() => {
    if (!isDragging) {
      const targetX = calculateOffset(selectedProjectIndex, true);
      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    }
  }, [selectedProjectIndex, isDragging]);

  // Handle drag end to snap to nearest item
  const handleDragEnd = () => {
    setIsDragging(false);

    // Get the current x position
    const currentX = x.get();

    let index = 0;
    // Find closest item to this point
    let closest = {
      index: 0,
      distance: Infinity,
    };

    for (const _ of itemRefs.current) {
      const targetX = calculateOffset(index, true);
      const distance = Math.abs(currentX - targetX);
      if (distance > closest.distance) {
        break;
      }
      if (distance < closest.distance) {
        closest.index = index;
        closest.distance = distance;
      }

      index += 1;
    }
    setSelectedProjectIndex(closest.index);
  };

  const handleDragStart = () => {
    setIsDragging(true);
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
        style={{ x, gap: SLIDE_GAP }}
      >
        {titles.map((item, index) => (
          <motion.button
            ref={(el) => {
              if (el) itemRefs.current[index] = el;
            }}
            key={index}
            className={styles.TitleSliderItem}
            data-active={index === selectedProjectIndex}
            draggable={false}
            onClick={() => !isDragging && setSelectedProjectIndex(index)}
          >
            {item.title}
          </motion.button>
        ))}
      </MotionStack>
    </Stack>
  );
};

export default TitleSlider;
