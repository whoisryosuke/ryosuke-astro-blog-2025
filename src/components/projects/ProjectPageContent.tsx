import React from "react";
import type { FeaturedWorkSlideData } from "../page/Frontpage/FeaturedWork/FeaturedWorkSlider/slides";
import styles from "./ProjectPageContent.module.css";
import Stack from "../primitives/Stack/Stack";
import ProductPageHeader from "./ProductPageHeader/ProductPageHeader";

type Props = {
  project: FeaturedWorkSlideData;
};

const ProjectPageContent = ({ project }: Props) => {
  return (
    <div>
      <ProductPageHeader work={project} />
    </div>
  );
};

export default ProjectPageContent;
