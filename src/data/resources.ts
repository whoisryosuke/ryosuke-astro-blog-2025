import {
  BiAtom,
  BiBook,
  BiBox,
  BiCube,
  BiDesktop,
  BiGame,
  BiGlobe,
  BiLogoBlender,
  BiLogoFigma,
  BiLogoReact,
  BiMusic,
  BiPaint,
  BiSolidKeyboard,
} from "react-icons/bi";
import { BsFillKeyboardFill } from "react-icons/bs";
import { GrGamepad, GrKeyboard } from "react-icons/gr";

export const RESOURCE_CATEGORIES_ICONS = {
  web: BiDesktop,
  writing: BiBook,
  design: BiPaint,
  music: BiMusic,
  gamedev: GrGamepad,
  graphics: BiCube,
  figma: BiLogoFigma,
  blender: BiLogoBlender,
  reactjs: BiLogoReact,
  input: GrKeyboard,
};

export type ResourceCategories = keyof typeof RESOURCE_CATEGORIES_ICONS;

export interface Resource {
  name: string;
  description: string;
  category: ResourceCategories[];
  blog?: string;
  githubUrl: string;
}

export const RESOURCES: Resource[] = [
  {
    name: "ryosuke-next-blog-2023",
    description: "My current personal blog and portfolio",
    category: ["writing", "web"],
    blog: "https://whoisryosuke.com/blog/2024/the-vision-pro-redesign-of-2024",
    githubUrl: "https://github.com/whoisryosuke/ryosuke-next-blog-2023",
  },
  {
    name: "oat-milk-design",
    description: "UI library for prototyping on web",
    category: ["web", "design"],
    githubUrl: "https://github.com/whoisryosuke/oat-milk-design",
  },
  {
    name: "react-vite-library-boilerplate",
    description: "Template for making JS/TS libraries",
    category: ["writing", "web"],
    blog: "https://whoisryosuke.com/blog/2025/releasing-a-react-library-in-2025",
    githubUrl: "https://github.com/whoisryosuke/react-vite-library-boilerplate",
  },
  {
    name: "next-mdx-deck",
    description: "A NextJS template for creating slideshow presentations",
    category: ["writing", "web"],
    blog: "https://whoisryosuke.com/blog/2020/creating-speaker-decks-with-nextjs-and-mdx",
    githubUrl: "https://github.com/whoisryosuke/next-mdx-deck",
  },
  {
    name: "ryoturia-web",
    description: "Web-based 3D MIDI Piano",
    category: ["web", "music"],
    blog: "https://whoisryosuke.com/blog/2024/making-a-3d-piano-in-threejs",
    githubUrl: "https://github.com/whoisryosuke/ryoturia-web",
  },
  {
    name: "r3f-experiments",
    description: "React Three Fiber / ThreeJS Sketchbook",
    category: ["web", "gamedev", "music"],
    githubUrl: "https://github.com/whoisryosuke/r3f-experiments",
  },
  {
    name: "p5-experiments",
    description: "p5.js Sketchbook",
    category: ["web", "gamedev", "music"],
    githubUrl: "https://github.com/whoisryosuke/p5-experiments",
  },
  {
    name: "entourage",
    description: "Project launcher app",
    category: ["web"],
    githubUrl: "https://github.com/whoisryosuke/entourage-v2",
  },
  {
    name: "midi-synthesizer-app",
    description: "Web-based MIDI synthesizer",
    category: ["music"],
    githubUrl: "https://github.com/whoisryosuke/midi-synthesizer-app",
  },
  {
    name: "bevy-midi-playground",
    description: "MIDI synth in the Bevy game engine",
    category: ["music", "gamedev"],
    githubUrl: "https://github.com/whoisryosuke/bevy-midi-playground",
  },
  {
    name: "react-unified-input",
    description: "Multi-device input management for React",
    category: ["reactjs", "gamedev", "input"],
    blog: "https://whoisryosuke.com/blog/2024/focus-and-spatial-navigation-in-react",
    githubUrl: "https://github.com/whoisryosuke/react-unified-input",
  },
  {
    name: "react-gamepads",
    description: "Gamepad support for React",
    category: ["gamedev"],
    blog: "https://whoisryosuke.com/blog/2020/adding-game-controller-input-to-react)",
    githubUrl: "https://github.com/whoisryosuke/react-gamepads",
  },
  {
    name: "utility-props",
    description: "Utility style props for Web Components",
    category: ["design"],
    blog: "https://whoisryosuke.com/blog/2020/utility-props-for-web-components)",
    githubUrl: "https://github.com/whoisryosuke/utility-props",
  },
  {
    name: "input-manager",
    description: "Multi-device input management for JS",
    category: ["gamedev", "input"],
    githubUrl: "https://github.com/whoisryosuke/input-manager",
  },
  {
    name: "wgpu-hello-world",
    description: "Sandbox for WebGPU dev using Rust",
    category: ["graphics"],
    blog: "https://whoisryosuke.com/blog/2022/primitive-geometry-in-wgpu-and-rust)",
    githubUrl: "https://github.com/whoisryosuke/wgpu-hello-world",
  },
  {
    name: "webgpu-sandbox",
    description: "Sandbox for WebGPU dev using JS",
    category: ["graphics"],
    githubUrl: "https://github.com/whoisryosuke/webgpu-sandbox",
  },
  {
    name: "geometry-node-graph",
    description: "Export Blender geometry nodes for viewing on web",
    category: ["blender", "web"],
    blog: "https://whoisryosuke.com/blog/2023/exporting-geometry-nodes-from-blender)",
    githubUrl: "https://github.com/whoisryosuke/geometry-node-graph",
  },
  {
    name: "blender-render-buddy",
    description: "Blender addon that simplifies rendering",
    category: ["gamedev", "input"],
    blog: "https://whoisryosuke.com/blog/2024/how-i-made-the-render-buddy-blender-plugin)",
    githubUrl: "https://github.com/whoisryosuke/blender-render-buddy",
  },
  {
    name: "blender-midi-motion",
    description: "Import MIDI as animation into Blender",
    category: ["blender", "music"],
    blog: "https://whoisryosuke.com/blog/2024/midi-powered-animations-in-blender)",
    githubUrl: "https://github.com/whoisryosuke/blender-midi-motion",
  },
  {
    name: "blender-gamepad",
    description: "Control + animate in Blender with gamepad",
    category: ["blender", "gamedev"],
    blog: "https://whoisryosuke.com/blog/2024/using-gamepads-in-blender)",
    githubUrl: "https://github.com/whoisryosuke/blender-gamepad",
  },
  {
    name: "blender-design-token-manager",
    description: "Manage design tokens in Blender",
    category: ["blender", "design"],
    githubUrl: "https://github.com/whoisryosuke/blender-design-token-manager",
  },
  {
    name: "blender-render-dpi",
    description: "Use DPI measurement in Blender",
    category: ["blender", "design"],
    githubUrl: "https://github.com/whoisryosuke/blender-render-dpi",
  },
  {
    name: "ryos-blender-examples",
    description: "Examples of various techniques in Blender",
    category: ["blender"],
    githubUrl: "https://github.com/whoisryosuke/ryos-blender-examples",
  },
  {
    name: "figma-css-theme-generator",
    description: "Generates CSS theme from Figma styles",
    category: ["figma", "design"],
    githubUrl: "https://github.com/whoisryosuke/figma-css-theme-generator",
  },
  {
    name: "styled-theme-generator",
    description: "Generates Styled Components theme from Figma styles",
    category: ["figma", "design"],
    blog: "https://whoisryosuke.com/blog/2020/syncing-figma-styles-with-css-in-js)",
    githubUrl: "https://github.com/whoisryosuke/styled-theme-generator",
  },
  {
    name: "delta-skin-onyx",
    description: "Dark skin for Delta app made using Blender",
    category: ["gamedev", "design"],
    blog: "https://whoisryosuke.com/blog/2024/the-guide-for-designing-delta-skins)",
    githubUrl: "https://github.com/whoisryosuke/delta-skin-onyx",
  },
  {
    name: "triple-triad",
    description: "Triple Triad from FF8 remade on web",
    category: ["gamedev"],
    blog: "https://whoisryosuke.com/blog/2024/recreating-triple-triad-in-reactjs)",
    githubUrl: "https://github.com/whoisryosuke/triple-triad",
  },
  {
    name: "bevy-galaga",
    description: "Galaga in Bevy game engine",
    category: ["gamedev"],
    blog: "https://whoisryosuke.com/blog/2023/making-galaga-in-rust-with-bevy-part-1)",
    githubUrl: "https://github.com/whoisryosuke/bevy-galaga",
  },
  {
    name: "bevy-katamari",
    description: "Katamari Damacy in Bevy game engine",
    category: ["gamedev"],
    blog: "https://whoisryosuke.com/blog/2023/making-katamari-for-bevy-game-jam)",
    githubUrl: "https://github.com/whoisryosuke/bevy-katamari",
  },
  {
    name: "solid-canvaskit-renderer",
    description: "Native rendering using SolidJS + Skia",
    category: ["web", "graphics"],
    blog: "https://whoisryosuke.com/blog/2022/ditch-the-dom-with-solidjs-and-skia-canvaskit)",
    githubUrl: "https://github.com/whoisryosuke/solid-canvaskit-renderer",
  },
];

// export const RESOURCE_CATEGORIES = RESOURCES.reduce((merge, resource) => {
//   resource.category.forEach((category) => {
//     merge.add(category);
//   });

//   return merge;
// }, new Set([]) as Set<string>);
