import React, {
  useEffect,
  useRef,
  type HTMLProps,
  type PropsWithChildren,
} from "react";

/**
 * Time (in ms) for the navbar to reset back to selected position (vs hover)
 */
const RESET_DURATION = 4200;

export type NavbarLinkMeasurement = {
  width: number;
  left: number;
};

type Props = HTMLProps<HTMLAnchorElement> & {
  selected: boolean;
  setSelectedLink: (link: NavbarLinkMeasurement) => void;
  resetHash: number;
  handleReset: () => void;
};

const NavbarLink = ({
  children,
  className,
  selected,
  setSelectedLink,
  resetHash,
  handleReset,
  ...props
}: PropsWithChildren<Props>) => {
  const localHash = useRef(1);
  const ref = useRef<HTMLAnchorElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const measureLink = (target: HTMLAnchorElement) => {
    const measurement = target.getBoundingClientRect();
    const navbarMeasurment: NavbarLinkMeasurement = {
      width: measurement.width,
      left: measurement.left,
    };
    console.log("hovered link", measurement);

    setSelectedLink(navbarMeasurment);
  };

  /**
   * Hover interaction
   */
  useEffect(() => {
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      measureLink(target);

      timeoutRef.current = setTimeout(handleReset, RESET_DURATION);
    };

    console.log("adding hover event listener");
    ref.current?.addEventListener("mouseover", handleHover);

    return () => {
      ref.current?.removeEventListener("mouseover", handleHover);
    };
  }, []);

  /**
   * Sets the link as selected during initial load or resetting state
   */
  useEffect(() => {
    if (selected && ref.current) {
      if (localHash.current !== resetHash) {
        measureLink(ref.current);
        localHash.current = resetHash;
      }
    }
  }, [selected, resetHash]);

  return (
    <a ref={ref} className={`NavbarLink ${className}`} {...props}>
      {children}
    </a>
  );
};

export default NavbarLink;
