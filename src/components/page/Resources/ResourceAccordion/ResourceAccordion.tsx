import React, { useEffect, useRef, useState } from "react";
import { RESOURCES } from "../../../../data/resources";
import ResourceAccordionItem from "./ResourceAccordionItem";

type Props = {};

const ResourceAccordion = (props: Props) => {
  const [selectedResource, setSelectedResource] = useState(RESOURCES[0].name);

  // From here on, all this complexity basically handles selecting a resource
  // when the user scrolls. But only when the resource isn't on the screen
  // (requiring the intersection to keep track of elements) while a scroll
  // event listener checks if it needs to select something.
  // We reflect some state as refs to use inside callbacks (like scroll event).
  const selectedResourceRef = useRef(RESOURCES[0].name);
  const visibleResources = useRef<number[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const itemEls = useRef<HTMLDivElement[]>([]);

  const observeElement = (el: Element) => {
    if (!observer.current) return;
    observer.current.observe(el);
  };

  const handleIntersect: IntersectionObserverCallback = (entries, observer) => {
    // Find "intersecting" (aka visible) items
    const visibleElements = entries.filter((entry) => entry.isIntersecting);
    // Find items that have left the page (or on initial load, just off-page)
    const removedElements = entries.filter((entry) => !entry.isIntersecting);

    // Track elements that are on screen
    visibleElements.forEach((el) => {
      // Grab the resource index from the data attribute
      // we do this because this is all "outside" React,
      // so we need a way to connect elements to resources.
      const resourceIndex = el.target.getAttribute("data-index");
      if (!resourceIndex) return;
      visibleResources.current.push(parseInt(resourceIndex));
    });

    // Remove elements that aren't visible anymore
    removedElements.forEach((el) => {
      const resourceIndex = el.target.getAttribute("data-index");
      if (!resourceIndex) return;
      visibleResources.current = visibleResources.current.filter(
        (id) => id !== parseInt(resourceIndex),
      );
    });
  };

  const createObserver = () => {
    const options = {
      root: null,
      rootMargin: "100px",
      scrollMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(handleIntersect, options);
  };

  const observeElements = () => {
    itemEls.current.forEach(observeElement);
  };

  /**
   * Selects the most "middle" resource on screen.
   * Since we use resource ID/index and that increments, we can just sort and pick average.
   */
  const selectMiddleVisibleResource = () => {
    const sortedResourceIndices = visibleResources.current.sort(
      (a, b) => a - b,
    );
    if (sortedResourceIndices.length >= 1) {
      const halfwayIndex = Math.round(sortedResourceIndices.length / 2 - 1);
      const resourceIndex = sortedResourceIndices[halfwayIndex];
      const resource = RESOURCES[resourceIndex];
      setSelectedResource(resource.name);
      selectedResourceRef.current = resource.name;
    }
  };

  const handleScroll = () => {
    // Check if there are any resources in view selected
    // if not, select middle one
    const visibleResourceNames = visibleResources.current.map(
      (index) => RESOURCES[index].name,
    );
    const isVisibleResourceSelected = visibleResourceNames.includes(
      selectedResourceRef.current,
    );

    if (!isVisibleResourceSelected) {
      selectMiddleVisibleResource();
    }
  };

  useEffect(() => {
    createObserver();
    observeElements();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSelect = (name: string) => {
    setSelectedResource(name);
    selectedResourceRef.current = name;
  };

  const resourcesItems = RESOURCES.map((resource, index) => (
    <ResourceAccordionItem
      key={resource.name}
      index={index}
      ref={(el) => {
        if (el) itemEls.current[index] = el;
      }}
      {...resource}
      selectedResource={selectedResource}
      setSelectedResource={handleSelect}
    />
  ));
  return <div>{resourcesItems}</div>;
};

export default ResourceAccordion;
