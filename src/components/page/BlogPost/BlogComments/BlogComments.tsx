import React, { useState } from "react";
import { BSKY_HANDLE, type BlueskyComment } from "../../../../utils/bsky";
import BlogCommentBars from "./BlogCommentBars";
import BlueskyCommentTooltip from "./BlueskyCommentTooltip";
import styles from "./BlogComments.module.css";
import tooltipStyles from "../../../../styles/components/tooltip.module.css";
import { Tooltip } from "@base-ui/react";
import TooltipArrowIcon from "../../../icons/TooltipArrowIcon";
import Stack from "../../../primitives/Stack/Stack";
import Button from "../../../primitives/Button/Button";
import { BiCommentAdd, BiQuestionMark } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";

const commentTooltipHandle = Tooltip.createHandle<string>();

type Props = {
  id: string;
  waveform: number[];
  comments?: BlueskyComment[];
};

const BlogComments = ({ comments, waveform, id }: Props) => {
  const [selectedComment, setSelectedComment] = useState<string | null>(null);

  const selectComment = (id: string) => {
    setSelectedComment(id);
  };
  // No comments? Nothing to see here
  if (!comments || comments.length == 0) return <div></div>;

  const selectedCommentData = comments.find(
    (comment) => comment.id == selectedComment,
  );

  const url = `https://bsky.app/profile/${BSKY_HANDLE}/post/${id}`;

  return (
    <Stack>
      <Stack
        horizontal
        responsive
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <h2 style={{ margin: 0 }}>comments?</h2>
        <Button as="a" href={url} outline>
          what's up? <FaRegCommentDots />
        </Button>
      </Stack>
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
                        <p>
                          {selectedCommentData.post.substring(0, 200)}
                          {selectedCommentData.post.length > 200 && "..."}
                        </p>
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
    </Stack>
  );
};

export default BlogComments;
