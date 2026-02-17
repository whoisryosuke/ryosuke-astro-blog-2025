import List from "../primitives/List/List";
import Stack from "../primitives/Stack/Stack";
import BlueskyEmbed from "./Embeds/BlueskyEmbed";
import CodepenEmbed from "./Embeds/CodepenEmbed";
import ThreadsEmbed from "./Embeds/ThreadsEmbed";
import TweetEmbed from "./Embeds/TweetEmbed";

export const components = {
  ul: List,
  ol: (props: any) => <List ordered {...props} />,
  Stack,
  Box: (props: any) => <div {...props} />,
  ThreadsEmbed,
  TweetEmbed,
  CodepenEmbed,
  BlueskyEmbed,
};
