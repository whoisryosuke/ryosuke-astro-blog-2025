import { Input, type NoteMessageEvent, WebMidi } from "webmidi";
import React, { useEffect, useRef, useState } from "react";
import type { InputStore } from "../types";

type Props = {
  input: InputStore;
  setInput: (noteIndex: number, pressed: boolean) => void;
};

const MIDIDeviceInput = ({ input, setInput }: Props) => {
  const [instruments, setInstrument] = useState<string[]>([]);
  const inputRefs = useRef<Record<string, Input | undefined>>({});

  function onEnabled() {
    // Inputs
    WebMidi.inputs.forEach((input) => {
      console.log(
        "[MIDIDeviceInput] Found device",
        input.manufacturer,
        ". Name:",
        input.name,
      );

      const checkInstrument = instruments.findIndex(
        (instrument) => instrument === input.name,
      );
      if (checkInstrument >= 0) return;
      setInstrument((prevInstruments) => [...prevInstruments, input.name]);
    });

    // Outputs
    WebMidi.outputs.forEach((output) => {
      console.log(output.manufacturer, output.name);
    });
  }

  useEffect(() => {
    WebMidi.enable()
      .then(onEnabled)
      .catch((err) => console.error(err));

    return () => {
      WebMidi.disable();
    };
  }, []);

  const keyLog = (e: NoteMessageEvent) => {
    // We basically only need 1 octave (aka 12 keys), so any octave is ok
    const noteIndex = e.note.number % 12;
    // console.log("pressing key", noteIndex);
    setInput(noteIndex, true);
  };

  const clearKey = (e: NoteMessageEvent) => {
    const noteIndex = e.note.number % 12;
    setInput(noteIndex, false);

    // console.log("clearing key", noteIndex);
  };

  useEffect(() => {
    instruments.forEach((instrument) => {
      console.log("adding instrument", instrument);
      if (!instrument || inputRefs.current[instrument]) return;

      inputRefs.current[instrument] = WebMidi.getInputByName(instrument);
      if (!inputRefs.current[instrument]) return;
      inputRefs.current[instrument].addListener("noteon", keyLog);
      inputRefs.current[instrument].addListener("noteoff", clearKey);
    });
    return () => {
      instruments.forEach((instrument) => {
        const midiInput = inputRefs.current[instrument];

        if (midiInput && WebMidi.enabled) {
          midiInput.removeListener("noteon", keyLog);
          midiInput.removeListener("noteoff", clearKey);
        }
        delete inputRefs.current[instrument];
      });
    };
  }, [instruments]);
  return <></>;
};

export default MIDIDeviceInput;
