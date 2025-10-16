import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import type { HeadingData } from "./types";
import TableOfContentsListItem from "./TableOfContentsListItem";
import Stack from "../../../../primitives/Stack/Stack";
import "./TableOfContentsList.css";

type Props = {
  expanded: boolean;
  setExpanded: any;
};

const HEADING_TAG_NAMES = ["H1", "H2", "H3", "H4", "H5", "H6"];
/**
 * Size in pixels for extra offset when scrolling for headings
 */
const HEADING_FOCUS_OFFSET = 40;

const TableOfContentsList = ({ expanded, setExpanded }: Props) => {
  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const [selectedHeading, setSelectedHeading] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const handlePress = () => {
    setExpanded(false);
  };

  const observeHeading = (el: Element) => {
    if (!observer.current) return;
    observer.current.observe(el);
  };

  const loadHeaders = () => {
    const contentEl = document.getElementById("BlogPostContent");
    if (!contentEl) {
      console.error("Couldn't get blog content from DOM");
      return;
    }

    let newHeadings: HeadingData[] = [];
    for (const child of contentEl.children) {
      // Check if it's a heading
      if (!HEADING_TAG_NAMES.includes(child.tagName)) continue;

      const level = parseInt(child.tagName.charAt(1));

      // Save the data
      const newHeading: HeadingData = {
        level,
        title: child.innerHTML,
        id: child.id,
      };

      newHeadings.push(newHeading);

      observeHeading(child);
    }
    setHeadings(newHeadings);
  };

  const handleIntersect: IntersectionObserverCallback = (entries, observer) => {
    // Find "intersecting" (aka visible) items, then sort by distance from top
    const visibleElements = entries.filter((entry) => entry.isIntersecting);
    const sortedElements = visibleElements.sort(
      (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
    );

    // Got at least 1 element? We want the item closest to top
    if (sortedElements.length >= 1) {
      const selectedHeading = sortedElements[0];
      console.log("found a heading selecting", selectedHeading.target);
      setSelectedHeading(selectedHeading.target.id);
    }
  };

  const createObserver = () => {
    const options = {
      root: null,
      rootMargin: "0px",
      scrollMargin: "0px",
      threshold: 1.0,
    };

    const containerEl = document.getElementById("BlogPostContent");
    if (!containerEl) return;

    observer.current = new IntersectionObserver(handleIntersect, options);
  };

  useEffect(() => {
    createObserver();
    loadHeaders();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="TableOfContentsList"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 100 }}
    >
      <Stack className="list">
        {headings.map((heading) => (
          <TableOfContentsListItem
            {...heading}
            selected={heading.id == selectedHeading}
          />
        ))}
      </Stack>
    </motion.div>
  );
};

export default TableOfContentsList;
