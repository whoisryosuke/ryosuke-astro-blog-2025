export type StyleProps = {
  paddingLeft: number;
  paddingRight: number;
};

export type ResponsiveStyleProps = {
  pl: number;
  "pl-sm": number;
  "pl-md": number;
  pr: number;
  "pr-sm": number;
  "pr-md": number;
};

export const STYLE_PROP_BREAKPOINTS = {
  default: 100,
  sm: 250,
  md: 420,
};
