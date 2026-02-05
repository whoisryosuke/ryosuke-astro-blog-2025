import React, { useState } from "react";
import styles from "./FrontpageSlider.module.css";
import type { CollectionEntry } from "astro:content";
import { FRONTPAGE_TAB_COMPONENT, type FrontpageTabs } from "./constants";
import FrontpageTabButtons from "./FrontpageTabButtons";

type Props = {
  projects: CollectionEntry<"projects">[];
};

const FrontpageSlider = ({ projects }: Props) => {
  const [currentTab, setCurrentTab] = useState<FrontpageTabs>("projects");

  const TabComponent = FRONTPAGE_TAB_COMPONENT[currentTab];

  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <FrontpageTabButtons
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />

        <TabComponent projects={projects} />
      </div>
    </div>
  );
};

export default FrontpageSlider;
