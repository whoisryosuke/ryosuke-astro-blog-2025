import List from "../primitives/List/List";
import Stack from "../primitives/Stack/Stack";
import BlueskyEmbed from "./Embeds/BlueskyEmbed";
import CodepenEmbed from "./Embeds/CodepenEmbed";
import ThreadsEmbed from "./Embeds/ThreadsEmbed";
import TweetEmbed from "./Embeds/TweetEmbed";
import YouTubeEmbed from "./Embeds/YouTubeEmbed";

export const components = {
  ul: List,
  ol: (props: any) => <List ordered {...props} />,
  Stack,
  Box: (props: any) => <div {...props} />,
  PortfolioText: (props: any) => (
    <Stack
      style={{ width: "100%", maxWidth: "600px", margin: "auto" }}
      {...props}
    />
  ),
  ThreadsEmbed,
  TweetEmbed,
  CodepenEmbed,
  BlueskyEmbed,
  YouTubeEmbed,
};
