import React from "react";
import type { SocialMediaAccount } from "../../../data/social";
import SOCIAL_ICONS from "../../icons/social";

type Props = SocialMediaAccount & {};

const FooterSocialIcon = ({ username, url, platform }: Props) => {
  const Icon = SOCIAL_ICONS[platform];
  return (
    <a href={url} title={`Follow @${username} on ${platform}`}>
      <Icon />
    </a>
  );
};

export default FooterSocialIcon;
