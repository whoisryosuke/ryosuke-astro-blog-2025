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
  url: "https://www.twitch.tv/whoisryosuke",
  platform: "twitch",
};
const threads: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "https://www.threads.com/@whoisryosuke",
  platform: "threads",
};
const bluesky: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "https://bsky.app/profile/whoisryosuke.bsky.social",
  platform: "bluesky",
};
const github: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "https://github.com/whoisryosuke/",
  platform: "github",
};
const linkedin: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "https://www.linkedin.com/in/whoisryosuke/",
  platform: "linkedin",
};
const patreon: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "https://www.patreon.com/c/whoisryosuke",
  platform: "patreon",
};
const mastodon: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "https://mastodon.gamedev.place/@whoisryosuke",
  platform: "mastodon",
};
const instagram: SocialMediaAccount = {
  username: "whoisryosuke",
  url: "https://www.instagram.com/whoisryosuke/",
  platform: "instagram",
};

// Combine data into one access point
export type SocialMediaStructure = {
  connect: SocialMediaAccount[];
  watch: SocialMediaAccount[];
  support: SocialMediaAccount[];
};

export const SOCIAL_MEDIA_ACCOUNTS: SocialMediaStructure = {
  connect: [mastodon, bluesky, threads, instagram, github, linkedin],
  watch: [youtube, twitch],
  support: [patreon],
};
