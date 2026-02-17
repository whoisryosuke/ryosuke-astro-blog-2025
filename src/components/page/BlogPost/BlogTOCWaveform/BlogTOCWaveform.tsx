import React, { useEffect, useRef, useState } from "react";
import BlogWaveformCanvas from "./BlogWaveformCanvas";
import styles from "./BlogTOCWaveform.module.css";
import BlogWaveformPlayhead from "./BlogWaveformPlayhead";
import BlogWaveformMarkers from "./BlogWaveformMarkers";
import BlogTimelineGuide from "./BlogTimelineGuide";
import BlogTOCSidebar from "./BlogTOCSidebar";
import type { WaveformHeadingData } from "./types";
import BlogWaveformInput from "./BlogWaveformInput";

type Props = {
  waveform: number[];
};

const BlogTOCWaveform = ({ waveform }: Props) => {
  const HEADING_TAG_NAMES = ["H1", "H2", "H3", "H4", "H5", "H6"];
  // Is TOC visible?
  const [visible, setVisible] = useState(false);
  const [headings, setHeadings] = useState<WaveformHeadingData[]>([]);
  const [selectedHeading, setSelectedHeading] =
    useState<WaveformHeadingData | null>(null);
  const [pageSize, setPageSize] = useState(100);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    setSelectedHeading(newHeadings[0]);

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
      setSelectedHeading(
        headings.find((heading) => heading.id == selectedHeading.target.id),
      );
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

  const largeWidth = width > 600 ? 420 : width * 0.85;
  const shortWidth = width > 600 ? width * 0.3 : width * 0.3;
  const waveformWidth = visible ? shortWidth : largeWidth;

  return (
    <div className={styles.Container}>
      <div className={styles.Content} data-visible={visible}>
        <BlogTOCSidebar
          width={largeWidth}
          headings={headings}
          setSelectedHeading={setSelectedHeading}
          visible={visible}
          setVisible={setVisible}
        />
        <div className={styles.WaveformArea} data-visible={visible}>
          <BlogTimelineGuide />
          <div className={styles.WaveformContainer}>
            <BlogWaveformCanvas
              data={waveform}
              width={waveformWidth}
              height={visible ? 300 : 100}
            />
            {/* <BlogWaveformInput /> */}
            <BlogWaveformPlayhead width={largeWidth} />
          </div>
          <BlogWaveformMarkers
            width={waveformWidth}
            headings={headings}
            pageSize={pageSize}
            selectedHeading={selectedHeading}
            setSelectedHeading={setSelectedHeading}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogTOCWaveform;
