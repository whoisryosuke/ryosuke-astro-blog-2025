import React from "react";
import {
  SOCIAL_MEDIA_ACCOUNTS,
  type SocialMediaAccount,
} from "../../../data/social";
import Stack from "../../primitives/Stack/Stack";
import styles from "./FooterR2.module.css";

const SOCIAL_SHORT_NAMES = {
  youtube: "YT",
  twitch: "TWCH",
  threads: "THRDS",
  bluesky: "BSKY",
  github: "GH",
  linkedin: "LNKN",
  patreon: "PTRN",
  mastodon: "MSTDN",
  instagram: "IG",
};

type Props = {};

const FooterR2 = (props: Props) => {
  const renderProfile = (profile: SocialMediaAccount) => (
    <a
      href={profile.url}
      title={`${profile.username} on ${profile.platform}`}
      data-platform={profile.platform}
      target="_blank"
    >
      {SOCIAL_SHORT_NAMES[profile.platform]}
    </a>
  );
  return (
    <div className={styles.Container}>
      <Stack horizontal responsive className={styles.Content}>
        <Stack horizontal className={styles.Social}>
          {SOCIAL_MEDIA_ACCOUNTS.connect.map(renderProfile)}
          {SOCIAL_MEDIA_ACCOUNTS.watch.map(renderProfile)}
          {SOCIAL_MEDIA_ACCOUNTS.support.map(renderProfile)}
        </Stack>
        <div className={styles.Copytext}>Designed with 💙 by Ryo</div>
      </Stack>
    </div>
  );
};

export default FooterR2;
