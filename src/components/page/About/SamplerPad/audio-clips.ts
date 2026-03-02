export const AUDIO_CLIP_NAMES = [
  "compile",
  "decode",
  "design",
  "engineer",
  "midi",
  "Ryo",
  "stay-creative",
  "vibe",
  "build",
  "code",
  "three",
  "two",
  "one",
] as const;

export type AudioClipNames = (typeof AUDIO_CLIP_NAMES)[number];
export type AudioClipCache = Record<AudioClipNames, AudioBuffer>;
