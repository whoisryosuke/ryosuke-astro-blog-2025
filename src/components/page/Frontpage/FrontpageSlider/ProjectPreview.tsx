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
        {project.data.images.map((image, index) => {
          const imageSplit = image.split(".");
          const darkImage = imageSplit
            .map((imgStr, index) =>
              index == imageSplit.length - 2 ? `${imgStr}-dark` : imgStr,
            )
            .join(".");
          return (
            <picture key={image} className={styles.ProjectImage}>
              <source
                srcSet={`/projects/${project.id}/${darkImage}`}
                media="(prefers-color-scheme: dark)"
              />
              <img
                key={image}
                src={`/projects/${project.id}/${image}.jpg`}
                loading="lazy"
                data-index={index}
              />
            </picture>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProjectPreview;
