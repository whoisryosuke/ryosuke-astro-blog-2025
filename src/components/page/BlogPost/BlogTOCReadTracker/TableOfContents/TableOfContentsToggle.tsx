import Button from "../../../../primitives/Button/Button";
import "./TableOfContentsToggle.css";

type Props = {
  expanded: boolean;
  setExpanded: any;
};

const TableOfContentsToggle = ({ setExpanded }: Props) => {
  const handlePress = () => {
    setExpanded((prevState) => !prevState);
  };
  return (
    <Button className="TableOfContentsToggle" onClick={handlePress}>
      Table of Contents
    </Button>
  );
};

export default TableOfContentsToggle;
