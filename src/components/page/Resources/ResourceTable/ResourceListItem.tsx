import React, { type KeyboardEventHandler } from "react";
import type { Resource } from "../../../../data/resources";
import Stack from "../../../primitives/Stack/Stack";
import "./ResourceListItem.css";
import ResourceListItemIcon from "./ResourceListItemIcon";
import ResourcePreview from "./ResourcePreview";

type Props = Resource & {
  selectedResource: string;
  setSelectedResource: (resourceId: string) => void;
};

const ResourceListItem = ({
  name,
  category,
  githubUrl,
  selectedResource,
  setSelectedResource,
}: Props) => {
  const handleSelection = () => {
    setSelectedResource(name);
  };

  const handleEnter: KeyboardEventHandler<HTMLTableRowElement> = (e) => {
    const isEnterPressed = e.key == "Enter";
    if (!isEnterPressed) return;

    handleSelection();
  };

  const isSelected = selectedResource == name;

  return (
    <>
      <div
        className={`ResourceListItem ${isSelected && "selected"}`}
        tabIndex={0}
        // onMouseEnter={handleSelection}
        onKeyDown={handleEnter}
        onClick={handleSelection}
      >
        <div className="icons">
          <Stack horizontal gap="var(--space-0-75)">
            {category.map((categoryIconName) => (
              <ResourceListItemIcon
                key={categoryIconName}
                icon={categoryIconName}
              />
            ))}
          </Stack>
        </div>
        <div className="name">
          <h3>{name}</h3>
        </div>
      </div>
      <div className={`ResourceListItemPreview ${isSelected && "selected"}`}>
        <div>
          <ResourcePreview selectedResource={name} />
        </div>
      </div>
    </>
  );
};

export default ResourceListItem;
