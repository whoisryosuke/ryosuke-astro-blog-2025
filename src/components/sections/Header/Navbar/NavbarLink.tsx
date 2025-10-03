import React, {
  useEffect,
  useRef,
  type HTMLProps,
  type PropsWithChildren,
} from "react";

export type NavbarLinkMeasurement = {
  width: number;
  left: number;
};

type Props = HTMLProps<HTMLAnchorElement> & {
  selected: boolean;
  setSelectedLink: (link: NavbarLinkMeasurement) => void;
};

const NavbarLink = ({
  children,
  className,
  selected,
  setSelectedLink,
  ...props
}: PropsWithChildren<Props>) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const measureLink = (target: HTMLAnchorElement) => {
    const measurement = target.getBoundingClientRect();
    const navbarMeasurment: NavbarLinkMeasurement = {
      width: measurement.width,
      left: measurement.left,
    };
    console.log("hovered link", measurement);

    setSelectedLink(navbarMeasurment);
  };

  useEffect(() => {
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      measureLink(target);
    };

    console.log("adding hover event listener");
    ref.current?.addEventListener("mouseover", handleHover);

    return () => {
      ref.current?.removeEventListener("mouseover", handleHover);
    };
  }, []);

  useEffect(() => {
    if (selected && ref.current) {
      measureLink(ref.current);
    }
  }, [selected]);

  return (
    <a ref={ref} className={`NavbarLink ${className}`} {...props}>
      {children}
    </a>
  );
};

export default NavbarLink;
