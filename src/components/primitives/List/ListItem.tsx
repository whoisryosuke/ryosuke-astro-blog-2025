import React, { type PropsWithChildren } from "react";

type Props = {};

const ListItem = ({ children, ...props }: PropsWithChildren<Props>) => {
  return <li>{children}</li>;
};

export default ListItem;
