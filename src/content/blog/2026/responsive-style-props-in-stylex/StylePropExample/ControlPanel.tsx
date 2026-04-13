import React, { type ChangeEventHandler } from "react";
import Stack from "../../../../../components/primitives/Stack/Stack";
import type { ResponsiveStyleProps, StyleProps } from "./types";
import rangeStyles from "./RangeInput.module.css";
import Label from "./Label";

type Props = {
  styleProps: StyleProps | ResponsiveStyleProps;
  setProp: (propName: keyof StyleProps, value: number) => void;
  debugView: boolean;
  toggleView: (visible?: boolean) => void;
};

const ControlPanel = ({
  styleProps,
  setProp,
  debugView,
  toggleView,
}: Props) => {
  const keys = Object.keys(styleProps) as (keyof StyleProps)[];

  const handleChange =
    (key: keyof StyleProps): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setProp(key, parseInt(e.currentTarget.value));
    };

  const handleDebugView: ChangeEventHandler<HTMLInputElement> = (e) => {
    toggleView(e.currentTarget.checked);
  };

  return (
    <Stack gap="var(--space-1)" style={{ flex: 1 }}>
      <Stack style={{ alignItems: "start" }}>
        <Label>Debug View</Label>
        <input
          type="checkbox"
          checked={debugView}
          onChange={handleDebugView}
          style={{
            accentColor: "var(--color-secondary)",
            width: 32,
            height: 32,
            borderRadius: "1rem",
          }}
        />
      </Stack>
      {keys.map((key) => (
        <Stack gap="0">
          <Label>
            {key} ({styleProps[key]})
          </Label>
          <input
            className={rangeStyles.range}
            type="range"
            min="0"
            max="64"
            step="1"
            value={styleProps[key]}
            onChange={handleChange(key)}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default ControlPanel;
