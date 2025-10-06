import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import FeaturedWorkSlider from "./FeaturedWorkSlider/FeaturedWorkSlider";

type Props = {};

const FeaturedWork = (props: Props) => {
  return (
    <div style={{ minHeight: "500px" }}>
      <SectionHeading title="Featured Work" />
      <FeaturedWorkSlider />
    </div>
  );
};

export default FeaturedWork;
