import React from "react";
import type { FeaturedWorkSlideData } from "../page/Frontpage/FeaturedWork/FeaturedWorkSlider/slides";
import styles from "./ProjectPageContent.module.css";
import Stack from "../primitives/Stack/Stack";

type Props = {
  project: FeaturedWorkSlideData;
};

const ProjectPageContent = ({ project }: Props) => {
  return (
    <div>
      <h2
        className={styles.Title}
        style={{ viewTransitionName: `title-${project.slug}` }}
      >
        {project.title}
      </h2>
      <Stack horizontal>
        {new Array(4).fill(0).map((_, index) => (
          <div
            key={index}
            className={styles.MidiNote}
            style={{ viewTransitionName: `note-${index}` }}
          />
        ))}
      </Stack>
    </div>
  );
};

export default ProjectPageContent;
