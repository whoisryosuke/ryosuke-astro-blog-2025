import React, { useEffect, useRef } from "react";
import type { HeadingData } from "./types";
import "./TableOfContentsListItem.css";

type Props = HeadingData & {
  selected: boolean;
};

const TableOfContentsListItem = ({ title, id, level, selected }: Props) => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [selected]);

  return (
    <a
      ref={ref}
      href={`#${id}`}
      className={`h${level} ${selected && "selected"}`}
      dangerouslySetInnerHTML={{
        // Since we grab innerHTML from heading, we need to use this
        __html: title,
      }}
    ></a>
  );
};

export default TableOfContentsListItem;
