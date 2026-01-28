import React from "react";
import type { FeaturedWorkSlideData } from "../../page/Frontpage/FeaturedWork/FeaturedWorkSlider/slides";
import Stack from "../../primitives/Stack/Stack";
import styles from "./ProductPageHeader.module.css";

type Props = {
  work: FeaturedWorkSlideData;
};

const ProductPageHeader = ({ work }: Props) => {
  return (
    <a
      href={`/projects/${work.slug}`}
      className={styles.Link}
      style={{ viewTransitionName: `title-${work.slug}` }}
    >
      <h3
        className={styles.Title}
        // style={{ viewTransitionName: `title-${work.slug}` }}
      >
        {work.title}
      </h3>
      <Stack horizontal>
        {new Array(4).fill(0).map((_, index) => (
          <div
            key={index}
            className={styles.MidiNote}
            style={{ viewTransitionName: `note-${work.slug}-${index}` }}
          />
        ))}
      </Stack>
    </a>
  );
};

export default ProductPageHeader;
