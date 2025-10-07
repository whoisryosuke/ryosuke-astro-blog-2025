import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import SelfPortraitVector from "../../../icons/SelfPortraitVector";
import "./AboutSection.css";
import Stack from "../../../primitives/Stack/Stack";

type Props = {};

const AboutSection = (props: Props) => {
  return (
    <div className="AboutSection" style={{ minHeight: "500px" }}>
      <SectionHeading title="Featured Work" />
      <div className="portrait-banner">
        <div className="title">
          <div className="box">
            <h3>creative technologist</h3>
            <h2>
              ryosuke
              <br />
              hana
            </h2>
          </div>
        </div>
        <SelfPortraitVector />
      </div>
      <Stack className="description">
        <p>
          A <strong>creative technologist</strong> in{" "}
          <strong>San Francisco</strong> prototyping immersive interactive
          cross-platform applications and tools for designers and developers.
        </p>
        <p>
          Design and development for me are an exploration of the limits of the
          contemporary to elevate the modern standard. I experiment on the
          cutting edge and prototype visually captivating and functional
          products for the future.
        </p>
      </Stack>
    </div>
  );
};

export default AboutSection;
