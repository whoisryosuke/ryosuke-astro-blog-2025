import React from "react";

type Props = {
  name: string;
  image: string;
};

const ResourcePreviewImage = ({ name, image, ...props }: Props) => {
  const src = `images/resources/${name}/${image}`;

  return <img src={src} />;
};

export default ResourcePreviewImage;
