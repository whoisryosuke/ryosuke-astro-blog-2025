import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./FrontpageSlider.module.css";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import Stack from "../../../primitives/Stack/Stack";
import { ART_DATA } from "../../../../data/art";
import { BiHeart, BiHeartCircle } from "react-icons/bi";
import BlueskyIcon from "../../../icons/Bluesky";
import InstagramIcon from "../../../icons/Instagram";
import socialIconStyles from "../../../icons/SocialIconStyles.module.css";

const SLIDE_GAP = 20;
const SOCIAL_ICON_SIZE = 36;

const MotionStack = motion.create(Stack);

type Props = {
  selectedProjectIndex: number;
  setSelectedProjectIndex: React.Dispatch<React.SetStateAction<number>>;
};

const ArtSlides = ({
  selectedProjectIndex,
  setSelectedProjectIndex,
}: Props) => {
  const containerWidth = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideSize = useRef(0);
  const x = useMotionValue(0);

  // Update container width on mount and resize
  // Get slide size when window resizes
  useLayoutEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerLeft = containerRef.current.getBoundingClientRect().left;
        containerWidth.current = window.innerWidth - containerLeft;

        // Get size of a slide for use later
        const firstEl = containerRef.current.children
          .item(0)
          ?.children.item(0) as HTMLDivElement;
        slideSize.current = firstEl?.offsetWidth ?? 0;
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Calculate the offset needed to center the active item
  const calculateOffset = (index: number) => {
    // Gets center of screen then figures out where centered slide would start
    const centerOffset = containerWidth.current / 2 - slideSize.current / 2;
    // We figure out the slide position if it was placed on left side
    const offset = index * (slideSize.current + SLIDE_GAP);
    // Then shift it to the center
    return -offset + centerOffset;
  };

  // Animate to centered position when active index changes
  useEffect(() => {
    if (containerWidth.current > 0 && !isDragging) {
      const targetX = calculateOffset(selectedProjectIndex);
      animate(x, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 50,
      });
    }
  }, [selectedProjectIndex, containerWidth, isDragging]);

  const getClosestByDistance = (currentX: number) => {
    // Gets center of screen then figures out where centered slide would start
    const centerOffset = containerWidth.current / 2 - slideSize.current / 2;
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

  /**
   * When user scrolls with mouse wheel,
   * scroll slider and select next/prev item.
   */
  const handleScroll = (event: WheelEvent) => {
    // Determine scroll direction and amount
    const scrollAmountY = event.deltaY * -10;

    const currentX = x.get();
    const targetX = currentX + scrollAmountY;

    const closestIndex = getClosestByDistance(targetX);
    setSelectedProjectIndex(closestIndex);
  };

  useLayoutEffect(() => {
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
            <div className={styles.ArtSlideHoverBox}>
              <img
                src={`./images/art-slides/${item.image}`}
                draggable={false}
                className={styles.ArtSlideImage}
              />
              <div
                className={[
                  styles.ArtSlideInteraction,
                  socialIconStyles.SocialButtons,
                ].join(" ")}
              >
                {item.ig && (
                  <a
                    href={`https://www.instagram.com/whoisryosuke/${item.ig}`}
                    className={socialIconStyles.InstagramIcon}
                    target="_blank"
                  >
                    <InstagramIcon
                      width={SOCIAL_ICON_SIZE}
                      height={SOCIAL_ICON_SIZE}
                    />
                  </a>
                )}
                {item.bsky && (
                  <a
                    href={`https://bsky.app/profile/whoisryosuke.bsky.social/post/${item.bsky}`}
                    className={socialIconStyles.BlueskyIcon}
                    target="_blank"
                  >
                    <BlueskyIcon
                      width={SOCIAL_ICON_SIZE}
                      height={SOCIAL_ICON_SIZE}
                    />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </MotionStack>
    </div>
  );
};

export default ArtSlides;
