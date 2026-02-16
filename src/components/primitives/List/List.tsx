import React, { type PropsWithChildren } from "react";
import styles from "./List.module.css";

type Props = {};

const List = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <ul className={styles.List} {...props}>
      {children}
    </ul>
  );
};

export default List;
