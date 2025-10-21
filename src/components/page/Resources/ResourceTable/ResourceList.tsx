import React from "react";
import { RESOURCES } from "../../../../data/resources";
import ResourceListItem from "./ResourceListItem";
import "./ResourceList.css";

type Props = {
  selectedResource: string;
  setSelectedResource: (resourceId: string) => void;
};

const ResourceList = ({ selectedResource, setSelectedResource }: Props) => {
  const resourcesItems = RESOURCES.map((resource) => (
    <ResourceListItem
      key={resource.name}
      {...resource}
      selectedResource={selectedResource}
      setSelectedResource={setSelectedResource}
    />
  ));
  return (
    <table className="ResourceList">
      <thead>
        <tr>
          <td className="icons">Tags</td>
          <td>Project</td>
        </tr>
      </thead>
      <tbody>{resourcesItems}</tbody>
    </table>
  );
};

export default ResourceList;
