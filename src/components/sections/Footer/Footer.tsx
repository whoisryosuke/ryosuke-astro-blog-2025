import React from "react";
import Stack from "../../primitives/Stack/Stack";
import { SOCIAL_MEDIA_ACCOUNTS } from "../../../data/social";
import FooterSocialIcon from "./FooterSocialIcon";
import "./Footer.css";

type Props = {};

const Footer = (props: Props) => {
  return (
    <Stack className="Footer" gap="var(--space-2)">
      <Stack>
        <h1>Connect</h1>
        <Stack horizontal>
          {SOCIAL_MEDIA_ACCOUNTS.connect.map((account) => (
            <FooterSocialIcon {...account} />
          ))}
        </Stack>
      </Stack>

      <Stack horizontal gap="var(--space-6)">
        <Stack>
          <h2>Watch</h2>
          <Stack horizontal>
            {SOCIAL_MEDIA_ACCOUNTS.watch.map((account) => (
              <FooterSocialIcon {...account} />
            ))}
          </Stack>
        </Stack>
        <Stack>
          <h2>Support</h2>
          <Stack horizontal>
            {SOCIAL_MEDIA_ACCOUNTS.support.map((account) => (
              <FooterSocialIcon {...account} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Footer;
