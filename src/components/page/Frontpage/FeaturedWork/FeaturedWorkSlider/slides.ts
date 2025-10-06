export type FeaturedWorkSlideDataType = "NDA" | "CASE_STUDY";

export type FeaturedWorkSlideData = {
  title: string;
  type: FeaturedWorkSlideDataType;
  tags: string[];
  cover_image: string;
  url?: string;
};
export const FEATURED_WORK_SLIDES: FeaturedWorkSlideData[] = [
  {
    title: "PlayStation Portal",
    type: "NDA",
    tags: ["React Native", "Animation"],
    cover_image: "portal.png",
  },
  {
    title: "PlayStation 5 - Media Tab",
    type: "NDA",
    tags: ["React Native"],
    cover_image: "portal.png",
  },
  {
    title: "MIDI Synth UI",
    type: "CASE_STUDY",
    tags: ["React", "Figma"],
    cover_image: "portal.png",
  },
];
