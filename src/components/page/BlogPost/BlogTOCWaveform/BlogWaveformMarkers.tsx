import React, { useEffect, useRef, useState } from "react";
import type { WaveformHeadingData } from "./types";
import BlogWaveformMarker from "./BlogWaveformMarker";
import playheadStyles from "./BlogWaveformPlayhead.module.css";

type Props = {};

const BlogWaveformMarkers = (props: Props) => {
  const HEADING_TAG_NAMES = ["H1", "H2", "H3", "H4", "H5", "H6"];

  const [headings, setHeadings] = useState<WaveformHeadingData[]>([]);
  const [selectedHeading, setSelectedHeading] = useState("");
  const [pageSize, setPageSize] = useState(100);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

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

    let newHeadings: WaveformHeadingData[] = [];
    for (const child of contentEl.children) {
      // Check if it's a heading
      if (!HEADING_TAG_NAMES.includes(child.tagName)) continue;

      const level = parseInt(child.tagName.charAt(1));

      // Save the data
      const newHeading: WaveformHeadingData = {
        level,
        title: child.innerHTML,
        id: child.id,
        y: child.getBoundingClientRect().top + window.scrollY,
      };

      newHeadings.push(newHeading);

      observeHeading(child);
    }
    setHeadings(newHeadings);

    console.log("window size", document.documentElement.scrollHeight);
    setPageSize(document.documentElement.scrollHeight - window.innerHeight);
  };

  const handleIntersect: IntersectionObserverCallback = (entries, observer) => {
    // Find "intersecting" (aka visible) items, then sort by distance from top
    const visibleElements = entries.filter((entry) => entry.isIntersecting);
    const sortedElements = visibleElements
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      // Because we have a scroll-margin-top on headings that pads the scroll by 100
      // We only search for headings after that point. This prevents headings at top from stealing focus.
      .filter((el) => el.boundingClientRect.top > 90);

    // Got at least 1 element? We want the item closest to top
    if (sortedElements.length >= 1) {
      const selectedHeading = sortedElements[0];
      console.log("found a heading selecting", selectedHeading.target);
      setSelectedHeading(selectedHeading.target.id);
    }

    setPageSize(document.documentElement.scrollHeight - window.innerHeight);
  };

  const createObserver = () => {
    const options = {
      root: null,
      rootMargin: "100px",
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

  console.log("headings", headings);

  const renderHeadings = headings.map((heading) => (
    <BlogWaveformMarker
      key={heading.id}
      heading={heading}
      pageSize={pageSize}
    />
  ));

  return <div className={playheadStyles.Container}>{renderHeadings}</div>;
};

export default BlogWaveformMarkers;
