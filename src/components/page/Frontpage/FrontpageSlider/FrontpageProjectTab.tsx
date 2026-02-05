import type { CollectionEntry } from "astro:content";
import React, { useState } from "react";
import ProjectPreview from "./ProjectPreview";
import TitleSlider from "./TitleSlider";
import styles from "./FrontpageSlider.module.css";

type Props = {
  projects: CollectionEntry<"projects">[];
};

const FrontpageProjectTab = ({ projects }: Props) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  return (
    <div className={styles.TabContainer}>
      <ProjectPreview project={projects[selectedProjectIndex]} />
      <TitleSlider
        projects={projects}
        selectedProjectIndex={selectedProjectIndex}
        setSelectedProjectIndex={setSelectedProjectIndex}
      />
    </div>
  );
};

export default FrontpageProjectTab;
