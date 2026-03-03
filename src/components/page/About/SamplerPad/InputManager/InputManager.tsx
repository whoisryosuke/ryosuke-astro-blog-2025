import React from "react";
import type { InputStore, NoteHistory } from "../types";
import KeyboardInput from "./KeyboardInput";
import MIDIDeviceInput from "./MIDIDeviceInput";

type Props = {
  input: InputStore;
  setInput: (noteIndex: number, pressed: boolean) => void;
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
      <MIDIDeviceInput
        input={input}
        setInput={setInput}
        // createContext={createContext}
      />
    </>
  );
};

export default InputManager;
