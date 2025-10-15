import React from "react";
import type { HeadingData } from "./types";
import "./TableOfContentsListItem.css";

type Props = HeadingData & {};

const TableOfContentsListItem = ({ title, id, level }: Props) => {
  return (
    <a href={`#${id}`} className={`h${level}`}>
      {title}
    </a>
  );
};

export default TableOfContentsListItem;
