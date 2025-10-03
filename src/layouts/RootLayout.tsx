import React, { type PropsWithChildren } from "react";
import Fonts from "../components/Fonts";
import "../styles/tokens.css";
import "../styles/typography.css";

type Props = {};

const RootLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <html>
      <head>
        <Fonts />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
