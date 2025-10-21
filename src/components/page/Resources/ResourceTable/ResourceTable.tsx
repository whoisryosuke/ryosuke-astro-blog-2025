import React, { useState } from "react";
import Stack from "../../../primitives/Stack/Stack";
import ResourceList from "./ResourceList";
import ResourcePreview from "./ResourcePreview";
import "./ResourceTable.css";
import { AnimatePresence, motion } from "motion/react";

type Props = {};

const ResourceTable = (props: Props) => {
  const [selectedResource, setSelectedResource] = useState("");

  return (
    <Stack className="ResourceTable" horizontal responsive>
      <ResourceList
        selectedResource={selectedResource}
        setSelectedResource={setSelectedResource}
      />
      <AnimatePresence>
        <motion.div
          key={selectedResource}
          initial={{
            opacity: 0,
            x: 100,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.42,
          }}
        >
          <ResourcePreview selectedResource={selectedResource} />
        </motion.div>
      </AnimatePresence>
    </Stack>
  );
};

export default ResourceTable;
