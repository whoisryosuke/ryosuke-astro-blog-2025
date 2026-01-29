import React from "react";
import { FEATURED_WORK_SLIDES } from "../FeaturedWork/FeaturedWorkSlider/slides";
import Stack from "../../../primitives/Stack/Stack";
import ProductPageHeader from "../../../projects/ProductPageHeader/ProductPageHeader";
import type { CollectionEntry } from "astro:content";

type Props = {
  projects: CollectionEntry<"projects">[];
};

const FeaturedWorkV2 = ({ projects }: Props) => {
  return (
    <div>
      <h2>Featured Work</h2>
      <Stack>
        {projects.map((project) => (
          <ProductPageHeader work={project} />
        ))}
      </Stack>
    </div>
  );
};

export default FeaturedWorkV2;
