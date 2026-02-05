import type { JSX } from "react";
import FrontpageArtTab from "./FrontpageArtTab";
import FrontpageProjectTab from "./FrontpageProjectTab";

export const FRONTPAGE_TABS = {
  projects: "Projects",
  art: "Art & Animations",
};
export type FrontpageTabs = keyof typeof FRONTPAGE_TABS;

export const FRONTPAGE_TAB_COMPONENT: Record<
  FrontpageTabs,
  (props: any) => JSX.Element
> = {
  projects: FrontpageProjectTab,
  art: FrontpageArtTab,
};
