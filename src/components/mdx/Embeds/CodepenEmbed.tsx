import React from "react";
import Stack from "../../primitives/Stack/Stack";
import styles from "./CodepenEmbed.module.css";

type Props = {
  id: string;
  title: string;
  defaultTab: string;
};

const CodepenEmbed = ({ title, id, defaultTab = "js,result" }: Props) => {
  return (
    <Stack
      centered
      className={styles.Container}
      style={{ marginBottom: "var(--space-3)" }}
    >
      <script src="https://public.codepenassets.com/embed/index.js" />
      <p
        className="codepen"
        data-height="300"
        data-default-tab={defaultTab}
        data-slug-hash={id}
        data-pen-title={title}
        data-user="whoisryosuke"
        style={{
          width: "100%",
          height: "300px",
          boxSizing: "border-box",
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid",
          margin: "1em 0",
          padding: "1em",
        }}
      >
        <span>
          See the Pen{" "}
          <a href="https://codepen.io/whoisryosuke/pen/azoVVWB">{title}</a> by
          Ryosuke (<a href="https://codepen.io/whoisryosuke">@whoisryosuke</a>)
          on <a href="https://codepen.io">CodePen</a>.
        </span>
      </p>
    </Stack>
  );
};

export default CodepenEmbed;
