import React from "react";
import Button from "../../../primitives/Button/Button";
import { FRONTPAGE_TABS, type FrontpageTabs } from "./constants";
import Stack from "../../../primitives/Stack/Stack";

type Props = {
  currentTab: FrontpageTabs;
  setCurrentTab: React.Dispatch<React.SetStateAction<FrontpageTabs>>;
};

const FrontpageTabButtons = ({ currentTab, setCurrentTab }: Props) => {
  const handleClick = (id: FrontpageTabs) => {
    setCurrentTab(id);
  };
  const renderButtons = Object.entries(FRONTPAGE_TABS).map(([id, name]) => (
    <Button
      key={id}
      outline
      data-selected={currentTab == id}
      onClick={() => handleClick(id as FrontpageTabs)}
    >
      {name}
    </Button>
  ));
  return (
    <Stack horizontal style={{ justifyContent: "end" }}>
      {renderButtons}
    </Stack>
  );
};

export default FrontpageTabButtons;
