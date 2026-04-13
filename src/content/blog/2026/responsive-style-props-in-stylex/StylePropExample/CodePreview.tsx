import React from "react";
import type { StyleProps } from "./types";
import { Highlight, themes } from "prism-react-renderer";
import { useStore } from "@nanostores/react";
import { themeStore } from "../../../../../store/theme";

type Props = {
  styleProps: StyleProps;
};

const CodePreview = ({ styleProps }: Props) => {
  const theme = useStore(themeStore);

  const codeBlock = `<button
    style={{ 
        paddingLeft: ${styleProps.paddingLeft}, 
        paddingRight: ${styleProps.paddingRight}, 
    }}
>
    Button
</button>`;
  return (
    <div>
      <Highlight
        theme={theme.colorMode == "dark" ? themes.vsDark : themes.vsLight}
        code={codeBlock}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodePreview;
