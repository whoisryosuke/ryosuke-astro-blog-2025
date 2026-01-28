import React from "react";
import { FEATURED_WORK_SLIDES } from "../FeaturedWork/FeaturedWorkSlider/slides";
import Stack from "../../../primitives/Stack/Stack";
import ProductPageHeader from "../../../projects/ProductPageHeader/ProductPageHeader";

type Props = {};

const FeaturedWorkV2 = (props: Props) => {
  return (
    <div>
      <h2>Featured Work</h2>
      <Stack>
        {FEATURED_WORK_SLIDES.map((work) => (
          <ProductPageHeader work={work} />
        ))}
      </Stack>
    </div>
  );
};

export default FeaturedWorkV2;
