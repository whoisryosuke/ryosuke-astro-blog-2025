import React, { useEffect, useRef } from "react";
import type { HeadingData } from "./types";
import "./TableOfContentsListItem.css";

type Props = HeadingData & {
  selected: boolean;
  setSelectedHeading: React.Dispatch<React.SetStateAction<string>>;
};

const TableOfContentsListItem = ({
  title,
  id,
  level,
  selected,
  setSelectedHeading,
}: Props) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const scroll = () => {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    scroll();
  }, [selected]);

  const handleClick = () => {
    scroll();
    setSelectedHeading(id);
  };

  return (
    <a
      ref={ref}
      href={`#${id}`}
      className={`h${level} ${selected && "selected"}`}
      onClick={handleClick}
      dangerouslySetInnerHTML={{
        // Since we grab innerHTML from heading, we need to use this
        __html: `<span>${title}</span>`,
      }}
    ></a>
  );
};

export default TableOfContentsListItem;
