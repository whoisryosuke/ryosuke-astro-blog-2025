import { AtpAgent, type $Typed } from "@atproto/api";
import type { ThreadViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export const BSKY_HANDLE = "whoisryosuke.bsky.social";

export type BlueskyComment = {
  id: string;
  handle: string;
  name: string;
  avatar?: string;
  post: string;
  date: string;
};

export async function getBlueskyComments(id: string | undefined) {
  if (!id) return;
  const agent = new AtpAgent({ service: "https://public.api.bsky.app" });

  try {
    // Get the user's ID from their handle
    const {
      data: { did },
    } = await agent.resolveHandle({ handle: BSKY_HANDLE });

    // The AT Proto URL using user ID + post ID
    const postUri = `at://${did}/app.bsky.feed.post/${id}`;

    // Fetch thread
    const response = await agent.getPostThread({ uri: postUri });

    // The "thread" with replies.
    // We can assume it's this type because I wouldn't provide a blocked post.
    const thread = response.data.thread as $Typed<ThreadViewPost>;

    // console.log("thread", thread);

    if (thread.replies) {
      // console.log("Comments:", thread.replies);

      // We only want "thread" type posts.
      const filteredReplies = thread.replies.filter(
        (post) => post.$type == "app.bsky.feed.defs#threadViewPost",
      );
      const comments = filteredReplies.map((untypedReply) => {
        const reply = untypedReply as $Typed<ThreadViewPost>;
        console.log("record", reply.post.record);

        const comment: BlueskyComment = {
          id: reply.post.uri.split("/").pop() ?? "",
          handle: reply.post.author.handle,
          name: reply.post.author.displayName ?? "Anonymous",
          avatar: reply.post.author.avatar,
          post: reply.post.record.text as string,
          date: reply.post.record.createdAt as string,
        };

        return comment;
      });

      return comments;
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}
