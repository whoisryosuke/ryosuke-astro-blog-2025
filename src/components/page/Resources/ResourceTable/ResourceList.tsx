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
    <div className="ResourceList">
      <div className="head">
        <div className="icons">Tags</div>
        <div>Project</div>
      </div>
      <div className="body">{resourcesItems}</div>
    </div>
  );
};

export default ResourceList;
