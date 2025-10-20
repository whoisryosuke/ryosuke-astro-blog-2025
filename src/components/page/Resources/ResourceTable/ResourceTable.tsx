import React, { useState } from "react";
import Stack from "../../../primitives/Stack/Stack";
import ResourceList from "./ResourceList";
import ResourcePreview from "./ResourcePreview";

type Props = {};

const ResourceTable = (props: Props) => {
  const [selectedResource, setSelectedResource] = useState("");

  return (
    <Stack className="ResourceTable" horizontal responsive>
      <ResourceList setSelectedResource={setSelectedResource} />
      <ResourcePreview selectedResource={selectedResource} />
    </Stack>
  );
};

export default ResourceTable;
