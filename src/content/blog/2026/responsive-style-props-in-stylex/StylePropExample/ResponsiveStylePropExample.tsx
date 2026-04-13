import React, { useState, type ChangeEventHandler } from "react";
import Stack from "../../../../../components/primitives/Stack/Stack";
import Preview from "./Preview";
import ControlPanel from "./ControlPanel";
import {
  STYLE_PROP_BREAKPOINTS,
  type ResponsiveStyleProps,
  type StyleProps,
} from "./types";
import CodePreview from "./CodePreview";
import Label from "./Label";
import rangeStyles from "./RangeInput.module.css";
import ResponsiveCodePreview from "./ResponsiveCodePreview";

type Props = {};

const ResponsiveStylePropExample = (props: Props) => {
  const [debugView, setDebugView] = useState(true);
  const [width, setWidth] = useState(420);
  const [styleProps, setStyleProps] = useState<ResponsiveStyleProps>({
    pl: 8,
    "pl-sm": 16,
    "pl-md": 32,
    pr: 8,
    "pr-sm": 16,
    "pr-md": 32,
  });
  const setProp = (propName: keyof StyleProps, value: number) => {
    setStyleProps((prev) => ({
      ...prev,
      [propName]: value,
    }));
  };
  const breakpointKey = Object.entries(STYLE_PROP_BREAKPOINTS).find(
    (item) => width <= item[1],
  );
  const stylePropKey =
    breakpointKey && breakpointKey[0] != "default"
      ? `-${breakpointKey[0]}`
      : "";
  const currentStyleProps: StyleProps = {
    paddingLeft: styleProps[`pl${stylePropKey}`],
    paddingRight: styleProps[`pr${stylePropKey}`],
  };

  const toggleView = (visible?: boolean) => {
    setDebugView((prev) => visible ?? !prev);
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWidth(parseInt(e.currentTarget.value));
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
        style={{
          padding: "var(--space-1)",
        }}
      >
        <Preview
          styleProps={currentStyleProps}
          debugView={debugView}
          responsive
          width={width}
          breakpointKey={breakpointKey}
        />
        <Stack
          style={{
            border: "1.5px solid var(--color-gray-700)",
            borderRadius: "var(--space-0-75)",
            padding: "var(--space-1)",
          }}
        >
          <Stack gap="0">
            <Label>Width ({width}px)</Label>
            <input
              className={rangeStyles.range}
              type="range"
              min="100"
              max="420"
              step="1"
              value={width}
              onChange={handleChange}
            />
          </Stack>
          <ControlPanel
            styleProps={styleProps}
            setProp={setProp}
            debugView={debugView}
            toggleView={toggleView}
          />
          <ResponsiveCodePreview
            styleProps={styleProps}
            breakpointKey={stylePropKey}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ResponsiveStylePropExample;
