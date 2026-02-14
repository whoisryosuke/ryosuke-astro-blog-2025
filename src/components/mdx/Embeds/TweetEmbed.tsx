import React from "react";
import Stack from "../../primitives/Stack/Stack";

type Props = {
  username: string;
  id: string;
};
const TweetEmbed = ({ id, username = "whoisryosuke" }: Props) => {
  return (
    <Stack centered style={{ marginBottom: "var(--space-3)" }}>
      <script src="https://platform.twitter.com/widgets.js" />
      <blockquote className="twitter-tweet">
        <p>Loading tweet...</p>
        <a
          href={`https://twitter.com/${username}/status/${id}?ref_src=twsrc%5Etfw`}
        >
          Loading date...
        </a>
      </blockquote>
    </Stack>
  );
};

export default TweetEmbed;
