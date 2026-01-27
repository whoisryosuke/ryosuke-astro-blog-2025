import React from "react";
import { FEATURED_WORK_SLIDES } from "../FeaturedWork/FeaturedWorkSlider/slides";
import Stack from "../../../primitives/Stack/Stack";
import FeaturedWorkListItem from "./FeaturedWorkListItem";

type Props = {};

const FeaturedWorkV2 = (props: Props) => {
  return (
    <div>
      <h2>Featured Work</h2>
      <Stack>
        {FEATURED_WORK_SLIDES.map((work) => (
          <FeaturedWorkListItem work={work} />
        ))}
      </Stack>
    </div>
  );
};

export default FeaturedWorkV2;
