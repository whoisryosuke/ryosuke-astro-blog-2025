import React from "react";
import type { FeaturedWorkSlideData } from "./slides";

type Props = FeaturedWorkSlideData & {
  index: number;
  selected: boolean;
  setSelected: (index: number) => void;
};

const FeaturedWorkSlide = ({
  title,
  cover_image,
  tags,
  type,
  index,
  selected,
  setSelected,
  ...props
}: Props) => {
  const bgImage = `url(/images/featured-work/${cover_image})`;
  const handleSelectItem = () => {
    setSelected(index);
  };
  return (
    <div
      className={`FeaturedWorkSlide ${selected && "selected"}`}
      style={{ backgroundImage: bgImage }}
      tabIndex={0}
      onMouseEnter={handleSelectItem}
      onFocus={handleSelectItem}
      onClick={handleSelectItem}
      {...props}
    >
      <div className="info">
        <h4>{title}</h4>
        <ul className="tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturedWorkSlide;
