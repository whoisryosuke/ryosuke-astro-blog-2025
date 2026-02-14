import React, { type PropsWithChildren } from "react";
import Stack from "../../primitives/Stack/Stack";

type Props = {
  id: string;
};

const BlueskyEmbed = ({ id, children }: PropsWithChildren<Props>) => {
  return (
    <Stack centered style={{ marginBottom: "var(--space-3)" }}>
      <blockquote
        className="bluesky-embed"
        data-bluesky-uri={`at://did:plc:itayxaatwwlwww4fp3jac3nn/app.bsky.feed.post/${id}`}
        data-bluesky-cid="bafyreiflt6p6c77vxtubpa4aev2qzilnkntxjbxx5x34x5yovs2afazyta"
        data-bluesky-embed-color-mode="system"
      >
        {children}
      </blockquote>
      <script async src="https://embed.bsky.app/static/embed.js" />
    </Stack>
  );
};

export default BlueskyEmbed;
