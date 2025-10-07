import React, { type HTMLProps, type PropsWithChildren } from "react";
import "./Button.css";
import clsx from "clsx";

type Props = HTMLProps<HTMLButtonElement | HTMLAnchorElement> & {
  as?: keyof HTMLElementTagNameMap;
  ghost?: boolean;
  secondary?: boolean;
};

const Button = ({
  ghost,
  secondary,
  children,
  className,
  ...props
}: PropsWithChildren<Props>) => {
  const Component = props.as ?? "button";
  const ghostStyles = ghost && "ghost";
  const secondaryStyles = secondary && "secondary";
  return (
    <Component
      className={clsx("Button", className, ghostStyles, secondaryStyles)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
