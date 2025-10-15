import React, { useState } from "react";
import Stack from "../../../primitives/Stack/Stack";
import CircularProgress from "./CircularProgress/CircularProgress";
import "./BlogTOCReadTracker.css";
import Percent from "./Percent/Percent";
import TableOfContentsToggle from "./TableOfContents/TableOfContentsToggle";
import TableOfContentsList from "./TableOfContents/TableOfContentsList";

type Props = {};

const BlogTOCReadTracker = (props: Props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Stack className="BlogTOCReadTracker">
      <TableOfContentsList expanded={expanded} setExpanded={setExpanded} />

      <Stack horizontal>
        <CircularProgress />
        <TableOfContentsToggle expanded={expanded} setExpanded={setExpanded} />
        <Percent />
      </Stack>
    </Stack>
  );
};

export default BlogTOCReadTracker;
