import React from "react";
import type { ResponsiveStyleProps, StyleProps } from "./types";
import { Highlight, themes } from "prism-react-renderer";
import { useStore } from "@nanostores/react";
import { themeStore } from "../../../../../store/theme";

type Props = {
  styleProps: ResponsiveStyleProps;
};

const ResponsiveCodePreview = ({ styleProps, breakpointKey }: Props) => {
  const theme = useStore(themeStore);

  const styleCode = Object.entries(styleProps)
    .map(([key, value]) => `        '--${key}': ${value},`)
    .join("\n");

  const codeBlock = `<button
    style={{ 
${styleCode}
        paddingLeft: 'var(--pl${breakpointKey})', 
        paddingRight:'var(--pr${breakpointKey})', 
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

export default ResponsiveCodePreview;
