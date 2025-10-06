import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import ArtWallGrid from "./ArtWallGrid";
import "./ArtWall.css";

type Props = {};

const ArtWall = (props: Props) => {
  return (
    <div style={{ minHeight: "500px" }}>
      <SectionHeading title="Art & Animations" />
      <ArtWallGrid />
    </div>
  );
};

export default ArtWall;
