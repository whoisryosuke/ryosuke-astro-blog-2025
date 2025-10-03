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
  setSelectedLink: (link: NavbarLinkMeasurement) => void;
};

const NavbarLink = ({
  children,
  className,
  setSelectedLink,
  ...props
}: PropsWithChildren<Props>) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      const measurement = target.getBoundingClientRect();
      const navbarMeasurment: NavbarLinkMeasurement = {
        width: measurement.width,
        left: measurement.left,
      };
      console.log("hovered link", measurement);

      setSelectedLink(navbarMeasurment);
    };

    console.log("adding hover event listener");
    ref.current?.addEventListener("mouseover", handleHover);

    return () => {
      ref.current?.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <a ref={ref} className={`NavbarLink ${className}`} {...props}>
      {children}
    </a>
  );
};

export default NavbarLink;
