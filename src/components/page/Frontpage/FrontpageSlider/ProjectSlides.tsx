import type { CollectionEntry } from "astro:content";
import {
  animate,
  isBrowser,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import React, {
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
} from "react";
import Stack from "../../../primitives/Stack/Stack";
import styles from "./FrontpageSlider.module.css";

const SLIDE_WIDTH = 420;

const MotionStack = motion(Stack);

type TitleData = {
  id: string;
  title: string;
};

type Props = {
  projects: CollectionEntry<"projects">[];
  selectedProjectIndex: number;
  setSelectedProjectIndex: React.Dispatch<React.SetStateAction<number>>;
};

const ProjectSlides = ({
  projects,
  selectedProjectIndex,
  setSelectedProjectIndex,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
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

    console.log("drag end - x", currentX);

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
    console.log("drag end - closest index", closest.index, closest.distance);

    setSelectedProjectIndex(closest.index);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleProjectLink: MouseEventHandler = (e) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  return (
    <Stack className={styles.ProjectPreview} ref={containerRef}>
      <MotionStack
        horizontal
        className={styles.ArtSlideContainer}
        drag="x"
        dragElastic={0.2}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ x }}
      >
        {projects.map((project, index) => (
          <div
            key={project.data.cover_image}
            ref={(el) => {
              if (el) itemRefs.current[index] = el;
            }}
            className={`${styles.ArtSlide} ${styles.ProjectSlide}`}
            onClick={() => !isDragging && setSelectedProjectIndex(index)}
            draggable={false}
          >
            <img
              src={`/projects/${project.id}/${project.data.cover_image}`}
              loading="lazy"
              data-index={index}
              draggable={false}
            />
            {index == selectedProjectIndex && (
              <a
                href={`/projects/${project.id}`}
                className={styles.ProjectSlideLink}
                onClick={handleProjectLink}
                data-visible={index == selectedProjectIndex}
                draggable={false}
              >
                <span>👀</span>
              </a>
            )}
          </div>
        ))}
      </MotionStack>
    </Stack>
  );
};

export default ProjectSlides;
