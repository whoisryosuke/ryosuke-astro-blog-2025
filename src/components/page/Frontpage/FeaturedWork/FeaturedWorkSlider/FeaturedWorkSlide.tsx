import React from "react";
import type { FeaturedWorkSlideData } from "./slides";

type Props = FeaturedWorkSlideData & {};

const FeaturedWorkSlide = ({
  title,
  cover_image,
  tags,
  type,
  ...props
}: Props) => {
  const bgImage = `url(/images/featured-work/${cover_image})`;
  return (
    <div
      className="FeaturedWorkSlide"
      style={{ backgroundImage: bgImage }}
      tabIndex={0}
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
