import { useEffect } from "react";
import type { InputStore } from "../types";

type Props = {
  input: InputStore;
  setInput: React.Dispatch<React.SetStateAction<InputStore>>;
  createContext: () => void;
};

const KEYBOARD_INPUT_MAP = {
  z: 0,
  x: 1,
  c: 2,
  v: 3,
  a: 4,
  s: 5,
  d: 6,
  f: 7,
  q: 8,
  w: 9,
  e: 10,
  r: 11,
};

const KeyboardInput = ({ input, setInput, createContext }: Props) => {
  const keys = Object.keys(KEYBOARD_INPUT_MAP);

  // If pressed key is our target key then set to true
  function downHandler({ key }: KeyboardEvent): void {
    if (keys.includes(key)) {
      // createContext();

      //@ts-ignore
      const noteIndex = KEYBOARD_INPUT_MAP[key];
      if (!input[noteIndex].pressed)
        setInput((prev) => ({
          ...prev,
          [noteIndex]: {
            ...prev[noteIndex],
            pressed: true,
          },
        }));
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }: KeyboardEvent): void => {
    if (keys.includes(key)) {
      //@ts-ignore
      const noteIndex = KEYBOARD_INPUT_MAP[key];
      if (!input[noteIndex].pressed)
        setInput((prev) => ({
          ...prev,
          [noteIndex]: {
            ...prev[noteIndex],
            pressed: false,
          },
        }));
    }
  };

  // Add event listeners for keypress
  useEffect(() => {
    if (typeof window == "undefined") return;

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return <></>;
};

export default KeyboardInput;
