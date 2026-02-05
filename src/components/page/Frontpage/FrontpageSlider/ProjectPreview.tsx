import type { CollectionEntry } from "astro:content";
import React from "react";
import styles from "./FrontpageSlider.module.css";

type Props = {
  project: CollectionEntry<"projects">;
};

const ProjectPreview = ({ project }: Props) => {
  return (
    <div className={styles.ProjectPreview}>
      <div className={styles.ProjectImageContainer}>
        {project.data.images.map((image, index) => (
          <img
            className={styles.ProjectImage}
            key={image}
            src={`/projects/${project.id}/${image}`}
            loading="lazy"
            data-index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectPreview;
