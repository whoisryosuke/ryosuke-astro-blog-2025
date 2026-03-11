import React from "react";
import type { BlueskyComment } from "../../../../utils/bsky";
import { Tooltip } from "@base-ui/react/tooltip";
import styles from "./BlueskyCommentTooltip.module.css";

type Props = {
  comment: BlueskyComment;
  handle: Tooltip.Handle<string>;
  selectComment: (id: string) => void;
};

const BlueskyCommentTooltip = ({ comment, handle, selectComment }: Props) => {
  const handleClick = () => {
    selectComment(comment.id);
  };

  const url = `https://bsky.app/profile/${comment.handle}/post/${comment.id}`;

  const x = Math.random() * 100;

  return (
    <Tooltip.Trigger
      id={comment.id}
      aria-label="Bold"
      onMouseOver={handleClick}
      onClick={handleClick}
      handle={handle}
      render={(props) => (
        <a
          {...props}
          href={url}
          className={styles.TooltipTrigger}
          style={{ "--x": `${x}%` } as React.CSSProperties}
          onMouseOver={handleClick}
          onClick={handleClick}
          target="_blank"
        />
      )}
    >
      <img src={comment.avatar} title={comment.name} />
    </Tooltip.Trigger>
  );
};

export default BlueskyCommentTooltip;
