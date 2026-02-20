import React from "react";
import type { InputStore } from "./types";

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

type Props = {
  setInput: React.Dispatch<React.SetStateAction<InputStore>>;
};

const InputManager = (props: Props) => {
  return <div>InputManager</div>;
};

export default InputManager;
