import React, { useEffect, useRef, useState } from "react";
import NavbarLink, { type NavbarLinkMeasurement } from "./NavbarLink";
import "./Navbar.css";

type Props = {};

const Navbar = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<NavbarLinkMeasurement>({
    width: 0,
    left: 0,
  });
  const [selectedLink, setSelectedLink] = useState<NavbarLinkMeasurement>({
    width: 0,
    left: 0,
  });

  useEffect(() => {
    const measurement = containerRef?.current?.getBoundingClientRect();
    if (!measurement) return;
    setContainerSize({
      width: measurement.width,
      left: measurement.left,
    });

    //@TODO: Resize observer
  }, []);

  const followPosition = selectedLink.left - containerSize.left;

  return (
    <nav ref={containerRef} className="Navbar">
      <NavbarLink href="/about" setSelectedLink={setSelectedLink}>
        About
      </NavbarLink>
      <NavbarLink href="/about" setSelectedLink={setSelectedLink}>
        Blog
      </NavbarLink>
      <NavbarLink href="/about" setSelectedLink={setSelectedLink}>
        Work
      </NavbarLink>
      <NavbarLink href="/about" setSelectedLink={setSelectedLink}>
        Resources
      </NavbarLink>
      <div
        className="follow"
        style={{
          "--width": `${selectedLink.width}px`,
          "--left": `${followPosition}px`,
        }}
      />
    </nav>
  );
};

export default Navbar;
