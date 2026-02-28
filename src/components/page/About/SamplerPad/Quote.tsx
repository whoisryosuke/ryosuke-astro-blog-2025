import React from "react";
import type { InputStore } from "./types";

type Props = {
  input: InputStore;
};

const Quote = ({ input }: Props) => {
  return (
    <h2>
      I <span data-lite={input[0].pressed}>experiment</span> on the{" "}
      <span data-lite={input[1].pressed}>cutting</span>{" "}
      <span data-lite={input[2].pressed}>edge</span> and{" "}
      <span data-lite={input[3].pressed}>prototype</span>{" "}
      <span data-lite={input[4].pressed}>visually</span>{" "}
      <span data-lite={input[5].pressed}>captivating</span> and{" "}
      <span data-lite={input[6].pressed}>functional</span>{" "}
      <span data-lite={input[7].pressed}>products</span> for the{" "}
      <span data-lite={input[8].pressed}>future</span>.
    </h2>
  );
};

export default Quote;
