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
  const itemRefs = useRef<HTMLAnchorElement[]>([]);
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

  const getClosestByDistance = (currentX: number) => {
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
    return closest;
  };

  // Handle drag end to snap to nearest item
  const handleDragEnd = () => {
    setIsDragging(false);

    // Get the current x position
    const currentX = x.get();

    console.log("drag end - x", currentX);

    const closest = getClosestByDistance(currentX);

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

  const handleScroll = (event) => {
    // Determine scroll direction and amount
    const scrollAmountY = event.deltaY * -10;

    const currentX = x.get();
    const targetX = currentX + scrollAmountY;

    const closest = getClosestByDistance(targetX);
    setSelectedProjectIndex(closest.index);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.addEventListener("wheel", handleScroll);

    return () => {
      containerRef.current?.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const handleClick =
    (index: number): MouseEventHandler =>
    (e) => {
      const isSelected = index == selectedProjectIndex;
      if (!isSelected || isDragging) e.preventDefault();
      !isDragging && setSelectedProjectIndex(index);
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
          <a
            key={project.data.cover_image}
            href={`/projects/${project.id}`}
            ref={(el) => {
              if (el) itemRefs.current[index] = el;
            }}
            className={`${styles.ArtSlide} ${styles.ProjectSlide}`}
            onClick={handleClick(index)}
            data-visible={index == selectedProjectIndex}
            draggable={false}
          >
            <img
              src={`/projects/${project.id}/${project.data.cover_image}`}
              data-index={index}
              draggable={false}
              className={styles.ArtSlideImage}
            />
            <span>
              {project.data.images.map((image) => (
                <img
                  src={`/projects/${project.id}/${image}`}
                  className={styles.ArtSlideExtraImg}
                />
              ))}
            </span>
          </a>
        ))}
      </MotionStack>
    </Stack>
  );
};

export default ProjectSlides;
