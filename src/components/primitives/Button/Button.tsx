import React, { type HTMLProps, type PropsWithChildren } from "react";
import "./Button.css";
import clsx from "clsx";

type Props = HTMLProps<HTMLButtonElement | HTMLAnchorElement> & {
  as?: keyof HTMLElementTagNameMap;
  ghost?: boolean;
  secondary?: boolean;
  outline?: boolean;
};

const Button = ({
  ghost,
  secondary,
  outline,
  children,
  className,
  ...props
}: PropsWithChildren<Props>) => {
  const Component = props.as ?? "button";
  const ghostStyles = ghost && "ghost";
  const secondaryStyles = secondary && "secondary";
  const outlineStyles = outline && "outline";
  return (
    <Component
      className={clsx(
        "Button",
        className,
        ghostStyles,
        secondaryStyles,
        outlineStyles,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
