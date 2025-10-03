import React, { useEffect, useRef, useState } from "react";
import NavbarLink, { type NavbarLinkMeasurement } from "./NavbarLink";
import "./Navbar.css";
import { motion } from "motion/react";

type NavLink = {
  href: string;
  text: string;
};
const LINKS: NavLink[] = [
  {
    href: "/",
    text: "About",
  },
  {
    href: "/blog",
    text: "Blog",
  },
  {
    href: "/work",
    text: "Work",
  },
  {
    href: "/resources",
    text: "Resources",
  },
];

type Props = {
  path: string;
};

const Navbar = ({ path }: Props) => {
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

  console.log("path", path);

  const followPosition = selectedLink.left - containerSize.left;

  const renderLinks = LINKS.map((link) => {
    return (
      <NavbarLink
        href={link.href}
        selected={link.href == path}
        setSelectedLink={setSelectedLink}
      >
        {link.text}
      </NavbarLink>
    );
  });

  return (
    <nav ref={containerRef} className="Navbar">
      {renderLinks}
      <motion.div
        className="follow"
        animate={{
          "--width": `${selectedLink.width}px`,
          "--left": `${followPosition}px`,
        }}
        transition={{ type: "spring", bounce: 0.1 }}
      />
    </nav>
  );
};

export default Navbar;
