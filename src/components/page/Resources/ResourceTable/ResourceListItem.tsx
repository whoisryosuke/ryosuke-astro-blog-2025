import React from "react";
import type { Resource } from "../../../../data/resources";
import Stack from "../../../primitives/Stack/Stack";
import "./ResourceListItem.css";
import ResourceListItemIcon from "./ResourceListItemIcon";

type Props = Resource & {
  setSelectedResource: (resourceId: string) => void;
};

const ResourceListItem = ({
  name,
  category,
  githubUrl,
  setSelectedResource,
}: Props) => {
  const handleSelection = () => {
    setSelectedResource(name);
  };

  return (
    <tr
      className="ResourceListItem"
      tabIndex={0}
      onMouseEnter={handleSelection}
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
