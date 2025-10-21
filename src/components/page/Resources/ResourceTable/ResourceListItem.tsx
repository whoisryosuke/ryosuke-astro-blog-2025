import React from "react";
import type { Resource } from "../../../../data/resources";
import Stack from "../../../primitives/Stack/Stack";
import "./ResourceListItem.css";
import ResourceListItemIcon from "./ResourceListItemIcon";

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

  const isSelected = selectedResource == name;

  return (
    <tr
      className={`ResourceListItem ${isSelected && "selected"}`}
      tabIndex={0}
      // onMouseEnter={handleSelection}
      onClick={handleSelection}
    >
      <td className="icons">
        <Stack horizontal gap="var(--space-0-75)">
          {category.map((categoryIconName) => (
            <ResourceListItemIcon
              key={categoryIconName}
              icon={categoryIconName}
            />
          ))}
        </Stack>
      </td>
      <td className="name">
        <h3>{name}</h3>
      </td>
    </tr>
  );
};

export default ResourceListItem;
