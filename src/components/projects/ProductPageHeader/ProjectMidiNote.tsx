import React, { useState, type MouseEvent } from "react";
import styles from "./ProductPageHeader.module.css";

type Props = {
  projectId: string;
  image: string;
};

const ProjectMidiNote = ({ image, projectId }: Props) => {
  const [hovering, setHovering] = useState(false);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  const handleHover = (e: MouseEvent<HTMLButtonElement>) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
    setHovering(true);
  };

  const handleHoverOff = () => {
    setHovering(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <button
      className={styles.MidiNote}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOff}
      onMouseMove={handleMouseMove}
    >
      <img
        key={projectId}
        src={`/projects/${projectId}/${image}`}
        data-visible={hovering}
        style={{
          top: mousePos.y - 50,
          left: mousePos.x + 50,
        }}
        loading="lazy"
      />
    </button>
  );
};

export default ProjectMidiNote;
