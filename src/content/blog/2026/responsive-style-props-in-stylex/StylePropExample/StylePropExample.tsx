import React, { useState } from "react";
import Stack from "../../../../../components/primitives/Stack/Stack";
import Preview from "./Preview";
import ControlPanel from "./ControlPanel";
import type { StyleProps } from "./types";
import CodePreview from "./CodePreview";

type Props = {};

const StylePropExample = (props: Props) => {
  const [debugView, setDebugView] = useState(true);
  const [styleProps, setStyleProps] = useState<StyleProps>({
    paddingLeft: 16,
    paddingRight: 16,
  });
  const setProp = (propName: keyof StyleProps, value: number) => {
    setStyleProps((prev) => ({
      ...prev,
      [propName]: value,
    }));
  };

  const toggleView = (visible?: boolean) => {
    setDebugView((prev) => visible ?? !prev);
  };

  return (
    <Stack
      style={{
        width: "100%",
        border: "1.5px solid var(--color-gray-700)",
        borderRadius: "var(--space-1)",
      }}
    >
      <Stack
        horizontal
        style={{
          padding: "var(--space-1)",
        }}
      >
        <Preview styleProps={styleProps} debugView={debugView} />
        <Stack
          style={{
            border: "1.5px solid var(--color-gray-700)",
            borderRadius: "var(--space-0-75)",
            padding: "var(--space-1)",
          }}
        >
          <ControlPanel
            styleProps={styleProps}
            setProp={setProp}
            debugView={debugView}
            toggleView={toggleView}
          />
          <CodePreview styleProps={styleProps} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default StylePropExample;
