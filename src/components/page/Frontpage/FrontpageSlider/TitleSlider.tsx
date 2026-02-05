import type { CollectionEntry } from "astro:content";
import React, { useEffect, useState } from "react";

type ProjectTitle = {
  id: string;
  title: string;
};

type Props = {
  projects: CollectionEntry<"projects">[];
  selectedProjectIndex: number;
};

const TitleSlider = ({ projects, selectedProjectIndex }: Props) => {
  const [titles, setTitles] = useState<ProjectTitle[]>([]);

  useEffect(() => {
    // Spawn initial titles
    // We want 3 in front and 3 behind current
    const nextTitles = new Array(6).fill(0).map((_, index) => {
      const offsetIndex = index - 3;
      const nextIndex = selectedProjectIndex - offsetIndex + 1;
      const projectIndex = (nextIndex + projects.length) % projects.length;
      console.log("index", projectIndex);
      const nextTitle = projects[projectIndex];
      return {
        id: nextTitle.id,
        title: nextTitle.data.title,
      };
    });

    setTitles(nextTitles);
  }, []);

  return (
    <div>
      {titles.map((title) => (
        <button>{title.title}</button>
      ))}
    </div>
  );
};

export default TitleSlider;
