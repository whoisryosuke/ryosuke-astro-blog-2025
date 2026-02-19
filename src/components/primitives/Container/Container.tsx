import React, { type HTMLProps } from "react";
import "./Container.css";

type Props = HTMLProps<HTMLDivElement> & {};

const Container = (props: Props) => {
  return <div className="Container" {...props} />;
};

export default Container;
