import React, { useEffect, useRef, useState } from "react";
import type { WaveformHeadingData } from "./types";
import BlogWaveformMarker from "./BlogWaveformMarker";
import playheadStyles from "./BlogWaveformPlayhead.module.css";
import styles from "./BlogTOCWaveform.module.css";
import { Tooltip } from "@base-ui/react";

const markerTooltip = Tooltip.createHandle<string>();

type Props = {};

const BlogWaveformMarkers = (props: Props) => {
  const HEADING_TAG_NAMES = ["H1", "H2", "H3", "H4", "H5", "H6"];

  const [headings, setHeadings] = useState<WaveformHeadingData[]>([]);
  const [selectedHeading, setSelectedHeading] =
    useState<WaveformHeadingData | null>(null);
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
      console.log("found a heading selecting", selectedHeading.target);
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

  console.log("headings", headings);

  const renderHeadings = headings.map((heading) => (
    <BlogWaveformMarker
      key={heading.id}
      heading={heading}
      pageSize={pageSize}
      handle={markerTooltip}
      setSelectedHeading={setSelectedHeading}
    />
  ));

  return (
    <div className={playheadStyles.Container}>
      <Tooltip.Provider>
        {renderHeadings}
        <Tooltip.Root
          handle={markerTooltip}
          // Debug
          // open={true}
          // triggerId={"what-are-design-tokens"}
        >
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={10} style={{ zIndex: 999 }}>
              <Tooltip.Popup className={styles.Popup}>
                <Tooltip.Arrow className={styles.Arrow}>
                  <ArrowSvg />
                </Tooltip.Arrow>
                {selectedHeading?.title}
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className={styles.ArrowFill}
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className={styles.ArrowOuterStroke}
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className={styles.ArrowInnerStroke}
      />
    </svg>
  );
}

export default BlogWaveformMarkers;
