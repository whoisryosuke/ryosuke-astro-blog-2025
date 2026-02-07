import type { CollectionEntry } from "astro:content";
import React, { useState } from "react";
import ProjectPreview from "./ProjectPreview";
import TitleSlider from "./TitleSlider";
import styles from "./FrontpageSlider.module.css";
import { AnimatePresence } from "motion/react";
import ArtSlides from "./ArtSlides";
import { ART_DATA } from "../../../../data/art";
import SliderNav from "./SliderNav";

type Props = {
  projects: CollectionEntry<"projects">[];
};

const FrontpageArtTab = ({ projects }: Props) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const titles = ART_DATA.map((art) => ({
    id: art.title,
    title: art.title,
  }));

  return (
    <div className={styles.TabContainer}>
      <ArtSlides
        selectedProjectIndex={selectedProjectIndex}
        setSelectedProjectIndex={setSelectedProjectIndex}
      />
      <TitleSlider
        titles={titles}
        selectedProjectIndex={selectedProjectIndex}
        setSelectedProjectIndex={setSelectedProjectIndex}
      />
      <SliderNav
        selectedProjectIndex={selectedProjectIndex}
        setSelectedProjectIndex={setSelectedProjectIndex}
      />
    </div>
  );
};

export default FrontpageArtTab;
