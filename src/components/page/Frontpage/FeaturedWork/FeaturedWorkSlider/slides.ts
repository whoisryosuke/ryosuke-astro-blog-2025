export type FeaturedWorkSlideDataType = "NDA" | "CASE_STUDY";

export type FeaturedWorkSlideData = {
  slug: string;
  title: string;
  type: FeaturedWorkSlideDataType;
  tags: string[];
  cover_image: string;
  url?: string;
};
export const FEATURED_WORK_SLIDES: FeaturedWorkSlideData[] = [
  {
    slug: "playstation-2020",
    title: "PlayStation",
    type: "NDA",
    tags: ["React Native", "Animation", "C++", "Graphics Programming"],
    cover_image: "portal.png",
  },
  {
    slug: "clawdio",
    title: "Clawdio",
    type: "CASE_STUDY",
    tags: ["Rust", "WASM", "TypeScript", "Audio Programming"],
    cover_image: "portal.png",
  },
  {
    slug: "midi-motion",
    title: "MIDI Motion",
    type: "CASE_STUDY",
    tags: ["Blender", "Python", "Audio Programming"],
    cover_image: "portal.png",
  },
];
