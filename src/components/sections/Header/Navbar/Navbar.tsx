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
  // {
  //   href: "/work",
  //   text: "Work",
  // },
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
  // We keep a hash around to trigger a re-render of navbar when needed
  const [resetHash, setResetHash] = useState(0);
  const [containerSize, setContainerSize] = useState<NavbarLinkMeasurement>({
    width: 0,
    left: 0,
  });
  const [selectedLink, setSelectedLink] = useState<NavbarLinkMeasurement>({
    width: 0,
    left: 0,
  });

  /**
   * Resets the navbar to selected state
   */
  const handleReset = () => {
    setResetHash(Date.now());
  };

  useEffect(() => {
    const measurement = containerRef?.current?.getBoundingClientRect();
    if (!measurement) return;
    setContainerSize({
      width: measurement.width,
      left: measurement.left,
    });

    //@TODO: Resize observer. Low priority since this is fairly static.
  }, []);

  const followPosition = selectedLink.left - containerSize.left;

  const renderLinks = LINKS.map((link) => {
    return (
      <NavbarLink
        key={link.href}
        href={link.href}
        selected={path.includes(link.href)}
        setSelectedLink={setSelectedLink}
        resetHash={resetHash}
        handleReset={handleReset}
      >
        {link.text}
      </NavbarLink>
    );
  });

  return (
    <div className="NavbarContainer">
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
    </div>
  );
};

export default Navbar;
