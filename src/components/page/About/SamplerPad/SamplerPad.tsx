import React, { useEffect, useState } from "react";
import Drumpad from "./Drumpad";
import AudioPlayer from "./AudioPlayer";
import InputManager from "./InputManager";
import { DEFAULT_INPUT_STORE, type InputStore } from "./types";
import Stack from "../../../primitives/Stack/Stack";

type Props = {};

const SamplerPad = (props: Props) => {
  const [input, setInput] = useState<InputStore>(DEFAULT_INPUT_STORE);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [buffer, setBuffer] = useState<AudioBuffer | null>(null);

  console.log("audio ctx", audioCtx, buffer);

  const createContext = () => {
    if (!audioCtx) {
      setAudioCtx(new AudioContext());
    } else {
      // @TODO: Check if closed requires recreation
      if (audioCtx.state !== "running") {
        console.log("resuming audio ctx");
        audioCtx.resume();
      }
    }
  };

  // We load the audio file when the audio context is created
  const loadAudio = async () => {
    if (!audioCtx) return;
    // const response = await fetch("/music/2024-12-14-rain-on-window.mp3");
    const response = await fetch("/music/C4.mp3");
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    setBuffer(audioBuffer);
  };
  useEffect(() => {
    if (audioCtx) loadAudio();
  }, [audioCtx]);

  return (
    <Stack style={{ flex: 1 }}>
      <Drumpad
        input={input}
        setInput={setInput}
        createContext={createContext}
      />
      <AudioPlayer audioCtx={audioCtx} input={input} buffer={buffer} />
      <InputManager setInput={setInput} createContext={createContext} />
    </Stack>
  );
};

export default SamplerPad;
