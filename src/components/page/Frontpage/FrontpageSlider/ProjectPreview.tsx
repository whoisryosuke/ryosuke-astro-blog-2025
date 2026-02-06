import type { CollectionEntry } from "astro:content";
import React from "react";
import styles from "./FrontpageSlider.module.css";
import { motion } from "motion/react";

type Props = {
  project: CollectionEntry<"projects">;
};

const ProjectPreview = ({ project }: Props) => {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={[styles.ProjectPreview, styles.CenterFlex].join(" ")}
    >
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
    </motion.div>
  );
};

export default ProjectPreview;
