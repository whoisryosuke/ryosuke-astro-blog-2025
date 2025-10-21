import React from "react";
import Stack from "../../../primitives/Stack/Stack";
import Button from "../../../primitives/Button/Button";
import { RESOURCES } from "../../../../data/resources";
import ResourcePreviewImage from "./ResourcePreviewImage";
import "./ResourcePreview.css";

type Props = {
  selectedResource: string;
};

const ResourcePreview = ({ selectedResource }: Props) => {
  const resourceData =
    RESOURCES.find((resource) => resource.name == selectedResource) ??
    RESOURCES[0];

  const images = resourceData.images ? resourceData.images : [];
  const renderImages = images.map((image) => (
    <ResourcePreviewImage name={resourceData.name} image={image} />
  ));

  return (
    <Stack className="ResourcePreview">
      <Stack>{renderImages}</Stack>
      <p>{resourceData.description}</p>
      <Stack horizontal>
        <Button as="a" outline href={resourceData.githubUrl}>
          Source Code
        </Button>
        {resourceData.blog && (
          <Button as="a" outline href={resourceData.blog}>
            Case Study
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default ResourcePreview;
