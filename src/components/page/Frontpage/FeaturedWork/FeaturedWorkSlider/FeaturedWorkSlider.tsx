import React, { useState } from "react";
import { FEATURED_WORK_SLIDES } from "./slides";
import FeaturedWorkSlide from "./FeaturedWorkSlide";
import "./FeaturedWorkSlider.css";

type Props = {};

const FeaturedWorkSlider = (props: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const setSelected = (index: number) => {
    setCurrentSlide(index);
  };

  const slides = FEATURED_WORK_SLIDES.map((slide, index) => (
    <FeaturedWorkSlide
      key={slide.title}
      index={index}
      selected={currentSlide == index}
      setSelected={setSelected}
      {...slide}
    />
  ));

  return (
    <div className="FeaturedWorkSlider">
      <div className="slides">{slides}</div>
    </div>
  );
};

export default FeaturedWorkSlider;
