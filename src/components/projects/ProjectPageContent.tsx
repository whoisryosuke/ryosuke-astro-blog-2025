import React from "react";
import type { FeaturedWorkSlideData } from "../page/Frontpage/FeaturedWork/FeaturedWorkSlider/slides";
import styles from "./ProjectPageContent.module.css";

type Props = {
  project: FeaturedWorkSlideData;
};

const ProjectPageContent = ({ project }: Props) => {
  return (
    <div>
      <h2 className={styles.Title}>{project.title}</h2>
    </div>
  );
};

export default ProjectPageContent;
