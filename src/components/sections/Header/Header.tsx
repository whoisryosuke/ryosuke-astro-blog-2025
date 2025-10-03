import React, { type PropsWithChildren } from "react";
import "./Header.css";
import Logotype from "./Logotype";
import Navbar from "./Navbar/Navbar";

type Props = {};

const Header = ({ children }: PropsWithChildren<Props>) => {
  return (
    <header className="Header">
      <Logotype />
      {children}
    </header>
  );
};

export default Header;
