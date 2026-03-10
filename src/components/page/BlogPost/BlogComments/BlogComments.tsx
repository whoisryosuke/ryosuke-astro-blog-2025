import React, { useState } from "react";
import type { BlueskyComment } from "../../../../utils/bsky";
import BlogCommentBars from "./BlogCommentBars";
import BlueskyCommentTooltip from "./BlueskyCommentTooltip";
import styles from "./BlogComments.module.css";
import tooltipStyles from "../../../../styles/components/tooltip.module.css";
import { Tooltip } from "@base-ui/react";
import TooltipArrowIcon from "../../../icons/TooltipArrowIcon";

const commentTooltipHandle = Tooltip.createHandle<string>();

type Props = {
  waveform: number[];
  comments?: BlueskyComment[];
};

const BlogComments = ({ comments, waveform }: Props) => {
  const [selectedComment, setSelectedComment] = useState<string | null>(null);

  const selectComment = (id: string) => {
    setSelectedComment(id);
  };
  if (!comments || comments.length == 0) return <div></div>;

  const selectedCommentData = comments.find(
    (comment) => comment.id == selectedComment,
  );

  return (
    <div className={styles.Container}>
      <BlogCommentBars waveform={waveform} />
      <div>
        <Tooltip.Provider>
          {comments.map((comment) => (
            <BlueskyCommentTooltip
              comment={comment}
              handle={commentTooltipHandle}
              selectComment={selectComment}
            />
          ))}
          <Tooltip.Root
            handle={commentTooltipHandle}
            // Debug
            // open={true}
            // triggerId={"what-are-design-tokens"}
          >
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={10} style={{ zIndex: 999 }}>
                <Tooltip.Popup
                  className={[tooltipStyles.Popup, styles.CommentPopup].join(
                    " ",
                  )}
                >
                  <Tooltip.Arrow className={tooltipStyles.Arrow}>
                    <TooltipArrowIcon />
                  </Tooltip.Arrow>
                  {selectedComment && selectedCommentData ? (
                    <div>
                      <h4>{selectedCommentData.name}</h4>
                      <p>{selectedCommentData.post}</p>
                    </div>
                  ) : (
                    "Can't find that..."
                  )}
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </div>
  );
};

export default BlogComments;
