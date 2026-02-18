import React, { forwardRef, type ForwardedRef } from "react";
import styles from "./ResourceAccordionItem.module.css";
import type { Resource } from "../../../../data/resources";
import Stack from "../../../primitives/Stack/Stack";
import ResourceListItemIcon from "../ResourceTable/ResourceListItemIcon";
import Button from "../../../primitives/Button/Button";
import ResourcePreviewImage from "../ResourceTable/ResourcePreviewImage";

type Props = Resource & {
  selectedResource: string;
  setSelectedResource: (resourceId: string) => void;
  index: number;
};

const ResourceAccordionItem = forwardRef(
  (
    {
      name,
      category,
      blog,
      githubUrl,
      images = [],
      selectedResource,
      setSelectedResource,
      index,
    }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const handleSelection = () => {
      setSelectedResource(name);
    };
    const isActive = selectedResource == name;

    const renderImages = images.map((image) => (
      <div key={image}>
        <ResourcePreviewImage name={name} image={image} />
      </div>
    ));

    return (
      <div
        ref={ref}
        className={styles.Container}
        data-active={isActive}
        data-name={name}
        data-index={index}
      >
        <button className={styles.Button} onClick={handleSelection}>
          {/* <span>
          {category.map((categoryIconName) => (
            <ResourceListItemIcon
              key={categoryIconName}
              icon={categoryIconName}
            />
          ))}
        </span> */}
          <h3>{name}</h3>
        </button>

        <div className={styles.SubMenu}>
          <Stack horizontal responsive className={styles.SubMenuContent}>
            {githubUrl && (
              <Button as="a" href={githubUrl} outline target="_blank">
                Source Code
              </Button>
            )}
            {blog && (
              <Button as="a" href={blog} outline>
                Case Study
              </Button>
            )}
            <Stack className={styles.SubMenuImages} horizontal>
              {renderImages}
            </Stack>
          </Stack>
        </div>
      </div>
    );
  },
);

// Optional: Assign a display name for better React DevTools debugging
ResourceAccordionItem.displayName = "ResourceAccordionItem";

export default ResourceAccordionItem;
