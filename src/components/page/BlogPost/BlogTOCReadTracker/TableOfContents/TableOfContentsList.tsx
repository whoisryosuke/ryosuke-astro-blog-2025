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

const TableOfContentsList = ({ expanded, setExpanded }: Props) => {
  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const handlePress = () => {
    setExpanded(false);
  };

  const loadHeaders = () => {
    console.log("loading headers");
    const contentEl = document.getElementById("BlogPostContent");
    if (!contentEl) {
      console.error("Couldn't get blog content from DOM");
      return;
    }

    let newHeadings: HeadingData[] = [];
    for (const child of contentEl.children) {
      console.log("child.tagName", child.tagName, child.innerHTML);

      // Check if it's a heading
      if (!HEADING_TAG_NAMES.includes(child.tagName)) continue;

      const level = parseInt(child.tagName.charAt(1));
      console.log("level", level);

      // Save the data
      const newHeading: HeadingData = {
        level,
        title: child.innerHTML,
        id: child.id,
      };

      newHeadings.push(newHeading);
    }
    setHeadings(newHeadings);
  };

  useEffect(() => {
    loadHeaders();
  }, []);

  return (
    <motion.div
      className="TableOfContentsList"
      animate={{ opacity: expanded ? 1 : 0 }}
    >
      <Stack className="list">
        {headings.map((heading) => (
          <TableOfContentsListItem {...heading} />
        ))}
      </Stack>
    </motion.div>
  );
};

export default TableOfContentsList;
