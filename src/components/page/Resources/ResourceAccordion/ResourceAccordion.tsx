import React, { useState } from "react";
import { RESOURCES } from "../../../../data/resources";
import ResourceAccordionItem from "./ResourceAccordionItem";

type Props = {};

const ResourceAccordion = (props: Props) => {
  const [selectedResource, setSelectedResource] = useState(RESOURCES[0].name);

  const resourcesItems = RESOURCES.map((resource) => (
    <ResourceAccordionItem
      key={resource.name}
      {...resource}
      selectedResource={selectedResource}
      setSelectedResource={setSelectedResource}
    />
  ));
  return <div>{resourcesItems}</div>;
};

export default ResourceAccordion;
