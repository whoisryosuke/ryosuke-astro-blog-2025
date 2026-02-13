import React from "react";
import type { FeaturedWorkSlideData } from "../../page/Frontpage/FeaturedWork/FeaturedWorkSlider/slides";
import Stack from "../../primitives/Stack/Stack";
import styles from "./ProductPageHeader.module.css";
import type { CollectionEntry } from "astro:content";
import Button from "../../primitives/Button/Button";

type Props = {
  project: CollectionEntry<"projects">;
};

const ProductPageHeaderFull = ({ project }: Props) => {
  return (
    <Stack>
      <Stack horizontal>
        {project.data.website && (
          <Button as="a" href={project.data.website} outline>
            View project
          </Button>
        )}
        {project.data.case_study && (
          <Button as="a" href={project.data.case_study} outline>
            Case study
          </Button>
        )}
      </Stack>
      <h3 className={styles.Title}>{project.data.title}</h3>
      <Stack horizontal>
        {project.data.images.map((image, index) => (
          <div key={index} className={styles.MidiNote} />
        ))}
      </Stack>
    </Stack>
  );
};

export default ProductPageHeaderFull;
