import React from "react";

type Props = {
  name: string;
  image: string;
};

const ResourcePreviewImage = ({ name, image, ...props }: Props) => {
  const src = `images/resources/${name}/${image}`;

  return <img src={src} loading="lazy" style={{ width: "100%" }} />;
};

export default ResourcePreviewImage;
