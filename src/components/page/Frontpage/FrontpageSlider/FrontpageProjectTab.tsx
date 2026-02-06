import type { CollectionEntry } from "astro:content";
import React, { useState } from "react";
import ProjectPreview from "./ProjectPreview";
import TitleSlider from "./TitleSlider";
import styles from "./FrontpageSlider.module.css";
import { AnimatePresence } from "motion/react";

type Props = {
  projects: CollectionEntry<"projects">[];
};

const FrontpageProjectTab = ({ projects }: Props) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const titles = projects.map((project) => ({
    id: project.id,
    title: project.data.title,
  }));

  return (
    <div className={styles.TabContainer}>
      <AnimatePresence>
        <ProjectPreview project={projects[selectedProjectIndex]} />
      </AnimatePresence>
      <TitleSlider
        titles={titles}
        selectedProjectIndex={selectedProjectIndex}
        setSelectedProjectIndex={setSelectedProjectIndex}
      />
    </div>
  );
};

export default FrontpageProjectTab;
