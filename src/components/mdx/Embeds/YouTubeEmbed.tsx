import React from "react";

type Props = { id: string };

const YouTubeEmbed = ({ id }: Props) => {
  return (
    <iframe
      //   width="1840"
      //   height="1035"
      src={`https://www.youtube.com/embed/${id}`}
      title="Responsive Style Props using StyleX"
      //   frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
      }}
    ></iframe>
  );
};

export default YouTubeEmbed;
