import type { CollectionEntry } from "astro:content";
import React, { useState } from "react";
import ProjectPreview from "./ProjectPreview";
import TitleSlider from "./TitleSlider";

type Props = {
  projects: CollectionEntry<"projects">[];
};

const FrontpageProjectTab = ({ projects }: Props) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  return (
    <div>
      <ProjectPreview project={projects[selectedProjectIndex]} />
      <TitleSlider
        projects={projects}
        selectedProjectIndex={selectedProjectIndex}
      />
    </div>
  );
};

export default FrontpageProjectTab;
