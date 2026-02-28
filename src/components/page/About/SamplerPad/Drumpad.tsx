import React from "react";
import { DRUMPAD_TOTAL_KEYS, type InputStore } from "./types";
import styles from "./Drumpad.module.css";

type Props = {
  input: InputStore;
  setInput: (noteIndex: number, pressed: boolean) => void;
  createContext: () => void;
};

const Drumpad = ({ input, setInput, createContext }: Props) => {
  const handleMouseInput = (index: number, pressed: boolean) => () => {
    // Initializing audio context requires user input
    // so we fire this off any chance we get here
    createContext();

    // console.log("mouse input", index, pressed);
    setInput(index, pressed);
  };

  const buttons = new Array(DRUMPAD_TOTAL_KEYS)
    .fill(0)
    .map((_, index) => (
      <button
        key={index}
        className={styles.Button}
        onMouseDown={handleMouseInput(index, true)}
        onMouseUp={handleMouseInput(index, false)}
        onMouseLeave={handleMouseInput(index, false)}
        onTouchStart={handleMouseInput(index, true)}
        onTouchEnd={handleMouseInput(index, false)}
        onTouchCancel={handleMouseInput(index, false)}
        data-pressed={input[index].pressed}
      />
    ));
  return <div className={styles.Container}>{buttons}</div>;
};

export default Drumpad;
