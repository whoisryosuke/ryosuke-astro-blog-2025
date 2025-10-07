import type SOCIAL_ICONS from "../components/icons/social";

export type SocialMediaPlatforms = keyof typeof SOCIAL_ICONS;
export type SocialMediaAccount = {
  username: string;
  url: string;
  platform: SocialMediaPlatforms;
};

// Accounts
const youtube: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "https://www.youtube.com/@whoisryosuke",
  platform: "youtube",
};
const twitch: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "",
  platform: "twitch",
};
const threads: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "",
  platform: "threads",
};
const bluesky: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "",
  platform: "bluesky",
};
const github: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "",
  platform: "github",
};
const linkedin: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "",
  platform: "linkedin",
};
const patreon: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "",
  platform: "patreon",
};
const mastodon: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "",
  platform: "mastodon",
};
const instagram: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "",
  platform: "instagram",
};

// Combine data into one access point
export type SocialMediaStructure = {
  connect: SocialMediaAccount[];
  watch: SocialMediaAccount[];
  support: SocialMediaAccount[];
};

export const SOCIAL_MEDIA_ACCOUNTS: SocialMediaStructure = {
  connect: [mastodon, bluesky, threads, instagram],
  watch: [youtube, twitch],
  support: [patreon],
};
