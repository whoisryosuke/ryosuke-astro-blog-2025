import React from "react";
import type { InputStore } from "../types";
import KeyboardInput from "./KeyboardInput";

type Props = {
  input: InputStore;
  setInput: React.Dispatch<React.SetStateAction<InputStore>>;
  createContext: () => void;
};

const InputManager = ({ input, setInput, createContext }: Props) => {
  return (
    <>
      <KeyboardInput
        input={input}
        setInput={setInput}
        createContext={createContext}
      />
    </>
  );
};

export default InputManager;
