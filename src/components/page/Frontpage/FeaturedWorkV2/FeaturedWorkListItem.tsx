import React from "react";
import type { FeaturedWorkSlideData } from "../FeaturedWork/FeaturedWorkSlider/slides";
import Stack from "../../../primitives/Stack/Stack";
import styles from "./FeaturedWorkListItem.module.css";
import TransitionLink from "../../../primitives/TransitionLink";

type Props = {
  work: FeaturedWorkSlideData;
};

const FeaturedWorkListItem = ({ work }: Props) => {
  return (
    <a href={`/projects/${work.slug}`} className={styles.Link}>
      <h3
        className={styles.Title}
        style={{ viewTransitionName: `title-${work.slug}` }}
      >
        {work.title}
      </h3>
      <Stack horizontal>
        {new Array(4).fill(0).map((_, index) => (
          <div
            key={index}
            className={styles.MidiNote}
            style={{ viewTransitionName: `note-${index}` }}
          />
        ))}
      </Stack>
    </a>
  );
};

export default FeaturedWorkListItem;
