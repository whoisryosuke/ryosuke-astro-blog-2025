import React, { type PropsWithChildren } from "react";
import Stack from "../../primitives/Stack/Stack";
import SectionHeading from "../Frontpage/SectionHeading/SectionHeading";

type Props = {};

const BlogIndexContainer = ({ children }: PropsWithChildren<Props>) => {
  return (
    <Stack>
      <SectionHeading title="Blog" />
      {children}
    </Stack>
  );
};

export default BlogIndexContainer;
