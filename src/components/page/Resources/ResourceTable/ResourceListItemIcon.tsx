import React from "react";
import { RESOURCE_CATEGORIES_ICONS } from "../../../../data/resources";

type Props = {
  icon: keyof typeof RESOURCE_CATEGORIES_ICONS;
};

const ResourceListItemIcon = ({ icon }: Props) => {
  const IconComponent =
    icon in RESOURCE_CATEGORIES_ICONS
      ? RESOURCE_CATEGORIES_ICONS[icon]
      : RESOURCE_CATEGORIES_ICONS.web;
  return <IconComponent size={32} />;
};

export default ResourceListItemIcon;
