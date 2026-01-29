import React from "react";
import type { FeaturedWorkSlideData } from "../../page/Frontpage/FeaturedWork/FeaturedWorkSlider/slides";
import Stack from "../../primitives/Stack/Stack";
import styles from "./ProductPageHeader.module.css";
import type { CollectionEntry } from "astro:content";

type Props = {
  work: CollectionEntry<"projects">;
};

const ProductPageHeader = ({ work: project }: Props) => {
  return (
    <a
      href={`/projects/${project.id}`}
      className={styles.Link}
      style={{ viewTransitionName: `title-${project.id}` }}
    >
      <h3
        className={styles.Title}
        // style={{ viewTransitionName: `title-${work.slug}` }}
      >
        {project.data.title}
      </h3>
      <Stack horizontal>
        {project.data.images.map((_, index) => (
          <div
            key={index}
            className={styles.MidiNote}
            style={{ viewTransitionName: `note-${project.id}-${index}` }}
          />
        ))}
      </Stack>
    </a>
  );
};

export default ProductPageHeader;
