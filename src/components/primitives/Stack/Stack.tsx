import React, { type HTMLProps, type PropsWithChildren } from "react";
import "./Stack.css";
import clsx from "clsx";

type Props = HTMLProps<HTMLDivElement> & {
  horizontal?: boolean;
  gap?: string;
  centered?: boolean;
  responsive?: boolean;
};

const Stack = ({
  horizontal,
  centered,
  responsive,
  gap = "1rem",
  className,
  style,
  ...props
}: PropsWithChildren<Props>) => {
  const horizontalStyles = horizontal && "horizontal";
  const centeredStyles = centered && "centered";
  const responsiveStyles = responsive && "responsive";
  return (
    <div
      className={clsx(
        "clw-stack",
        className,
        horizontalStyles,
        centeredStyles,
        responsiveStyles
      )}
      style={{
        "--gap": gap,
        ...style,
      }}
      {...props}
    />
  );
};

export default Stack;
