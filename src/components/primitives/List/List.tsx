import React, { type PropsWithChildren } from "react";
import styles from "./List.module.css";

type Props = {
  ordered: boolean;
};

const List = ({ children, ordered, ...props }: PropsWithChildren<Props>) => {
  const Component = ordered ? "ol" : "ul";
  return (
    <Component
      className={[styles.List, ordered && styles.Ordered].join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
};

export default List;
