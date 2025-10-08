import React from "react";
import "./BlogPostDate.css";
import Stack from "../../../primitives/Stack/Stack";

type Props = {
  date: Date;
};

const BlogPostDate = ({ date }: Props) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return (
    <Stack className="BlogPostDate" gap="var(--space-0-5)">
      <h4>Posted on</h4>
      <p>{formattedDate}</p>
    </Stack>
  );
};

export default BlogPostDate;
