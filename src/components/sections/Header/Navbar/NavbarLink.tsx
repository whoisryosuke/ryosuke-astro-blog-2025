import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type HTMLProps,
  type MouseEventHandler,
  type PropsWithChildren,
} from "react";
import throttle from "lodash/throttle";

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
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  resetHash: number;
  handleReset: () => void;
};

const NavbarLink = ({
  children,
  href,
  className,
  selected,
  setSelectedLink,
  selectedItem,
  setSelectedItem,
  resetHash,
  handleReset,
  ...props
}: PropsWithChildren<Props>) => {
  const localHash = useRef(1);
  const ref = useRef<HTMLAnchorElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const measureLink = () => {
    if (!ref.current) return;
    const measurement = ref.current.getBoundingClientRect();
    const navbarMeasurment: NavbarLinkMeasurement = {
      width: measurement.width,
      left: measurement.left,
    };

    // console.log("measuring link...", navbarMeasurment);

    setSelectedLink(navbarMeasurment);
  };

  const throttledMeasureLink = useMemo(
    () =>
      throttle(measureLink, 420, {
        leading: true,
        trailing: true,
      }),
    [],
  );

  /**
   * Hover interaction
   */
  const handleHover: MouseEventHandler = (e) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    measureLink();
    setSelectedItem(href as string);

    timeoutRef.current = setTimeout(handleReset, RESET_DURATION);
  };

  useLayoutEffect(() => {
    // console.log("selected?", selectedItem);
    if (selectedItem == href) {
      // console.log("selected, check for resize");
      measureLink();
      window.addEventListener("resize", throttledMeasureLink);
    }

    return () => {
      window.removeEventListener("resize", throttledMeasureLink);
    };
  }, [selectedItem]);

  /**
   * Sets the link as selected during initial load or resetting state
   */
  useEffect(() => {
    if (selected && ref.current) {
      if (localHash.current !== resetHash) {
        measureLink();
        setSelectedItem(href as string);

        localHash.current = resetHash;
      }
    }
  }, [selected, resetHash]);

  return (
    <a
      ref={ref}
      href={href}
      className={`NavbarLink ${className}`}
      onMouseOver={handleHover}
      {...props}
    >
      {children}
    </a>
  );
};

export default NavbarLink;
