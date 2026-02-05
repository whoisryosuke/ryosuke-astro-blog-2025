import React from "react";
import "@fontsource/stack-sans-text/400.css";
import "@fontsource/stack-sans-text/700.css";

type Props = {};

const Fonts = (props: Props) => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap"
        rel="stylesheet"
      ></link>
    </>
  );
};

export default Fonts;
