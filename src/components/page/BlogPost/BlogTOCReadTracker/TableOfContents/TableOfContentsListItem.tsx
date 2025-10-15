import React from "react";
import type { HeadingData } from "./types";
import "./TableOfContentsListItem.css";

type Props = HeadingData & {
  selected: boolean;
};

const TableOfContentsListItem = ({ title, id, level, selected }: Props) => {
  return (
    <a
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
