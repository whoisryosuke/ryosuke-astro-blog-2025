type Props = {
  expanded: boolean;
  setExpanded: any;
};

const TableOfContentsToggle = ({ setExpanded }: Props) => {
  const handlePress = () => {
    setExpanded((prevState) => !prevState);
  };
  return (
    <button className="TableOfContentsToggle" onClick={handlePress}>
      Table of Contents
    </button>
  );
};

export default TableOfContentsToggle;
