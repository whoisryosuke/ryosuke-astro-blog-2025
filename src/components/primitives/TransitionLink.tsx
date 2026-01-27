import React, { type HTMLProps, type MouseEventHandler } from "react";

type Props = HTMLProps<HTMLAnchorElement> & {};

const TransitionLink = ({ href, ...props }: Props) => {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    if (!href) return;

    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support it
      window.location.href = href;
      return;
    }

    // Start the view transition
    document.startViewTransition(() => {
      // Navigate to the new page
      window.location.href = href;
      console.log("starting transition...");
    });
  };
  return <a href={href} onClick={handleClick} {...props} />;
};

export default TransitionLink;
