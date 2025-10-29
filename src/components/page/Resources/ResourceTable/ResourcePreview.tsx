import React, { useEffect, useRef } from "react";
import Stack from "../../../primitives/Stack/Stack";
import Button from "../../../primitives/Button/Button";
import { RESOURCES } from "../../../../data/resources";
import ResourcePreviewImage from "./ResourcePreviewImage";
import "./ResourcePreview.css";

type Props = {
  selectedResource: string;
  className: string;
};

const ResourcePreview = ({ selectedResource, className }: Props) => {
  const focusRef = useRef<HTMLElement>(null);
  const prevResource = useRef("");

  const focusElement = () => {
    if (!focusRef.current) return;
    focusRef.current.focus();
  };

  useEffect(() => {
    if (prevResource.current !== selectedResource) {
      prevResource.current = selectedResource;
      // focusElement();
    }
  }, [selectedResource]);

  const resourceData =
    RESOURCES.find((resource) => resource.name == selectedResource) ??
    RESOURCES[0];

  const images = resourceData.images ? resourceData.images : [];
  const renderImages = images.map((image) => (
    <ResourcePreviewImage name={resourceData.name} image={image} />
  ));

  return (
    <Stack className={`ResourcePreview ${className}`}>
      <Stack className="images">{renderImages}</Stack>
      <p>{resourceData.description}</p>
      <Stack horizontal responsive>
        <Button ref={focusRef} as="a" outline href={resourceData.githubUrl}>
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
