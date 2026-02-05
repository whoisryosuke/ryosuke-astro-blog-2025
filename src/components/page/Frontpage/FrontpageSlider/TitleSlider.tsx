import type { CollectionEntry } from "astro:content";
import React from "react";

type Props = {
  projects: CollectionEntry<"projects">[];
  selectedProjectIndex: number;
};

const TitleSlider = ({ projects }: Props) => {
  return <div>TitleSlider</div>;
};

export default TitleSlider;
