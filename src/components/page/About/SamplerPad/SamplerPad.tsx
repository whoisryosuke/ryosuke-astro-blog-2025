import React, { useEffect, useState } from "react";
import Drumpad from "./Drumpad";
import AudioPlayer from "./AudioPlayer";
import InputManager from "./InputManager/InputManager";
import {
  DEFAULT_INPUT_STORE,
  DRUMPAD_TOTAL_KEYS,
  type InputStore,
} from "./types";
import Stack from "../../../primitives/Stack/Stack";
import SampleWaveform from "./SampleWaveform";
import WaveformBars from "./WaveformBars";
import Container from "../../../primitives/Container/Container";

function generateRandomSampleTimes() {
  const times = new Array(DRUMPAD_TOTAL_KEYS - 1)
    .fill(0)
    .map(() => Math.random() * DRUMPAD_TOTAL_KEYS);

  // We want it to always start at 0,
  times.push(0);

  const randomTimes = times.sort((a, b) => a - b);

  console.log("randomTimes", randomTimes);

  return randomTimes;
}

type Props = {};

const SamplerPad = (props: Props) => {
  const [input, setInput] = useState<InputStore>(DEFAULT_INPUT_STORE());
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [buffer, setBuffer] = useState<AudioBuffer | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [sampleTimes, setSampleTimes] = useState<number[]>([]);

  useEffect(() => {
    console.log("sample waveform init");
    // Create analyser and get buffer data
    const ctx = createContext();
    const analyserNode = ctx.createAnalyser();
    // Configure analyser
    analyserNode.fftSize = 1024;
    analyserNode.connect(ctx.destination);

    setAnalyser(analyserNode);
  }, []);

  useEffect(() => {
    setSampleTimes(generateRandomSampleTimes());
  }, []);

  // console.log("audio ctx", audioCtx, buffer);

  const createContext = () => {
    if (!audioCtx) {
      const newCtx = new AudioContext();
      setAudioCtx(newCtx);
      return newCtx;
    } else {
      // @TODO: Check if closed requires recreation
      if (audioCtx.state !== "running") {
        console.log("resuming audio ctx");
        audioCtx.resume();
      }
      return audioCtx;
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
    <Stack
      horizontal
      style={{
        flex: 1,
        padding: "var(--space-4)",
        paddingLeft: "var(--space-10)",
      }}
    >
      <Stack style={{ width: "61.8%" }}>
        <SampleWaveform width={840} height={200} buffer={buffer} />
        <Drumpad
          input={input}
          setInput={setInput}
          createContext={createContext}
        />
        <AudioPlayer
          audioCtx={audioCtx}
          input={input}
          buffer={buffer}
          sampleTimes={sampleTimes}
          analyser={analyser}
        />
      </Stack>
      <div>
        <h2>
          I experiment on the cutting edge and prototype visually captivating
          and functional products for the future.
        </h2>

        <WaveformBars analyser={analyser} />
        <InputManager
          input={input}
          setInput={setInput}
          createContext={createContext}
        />
      </div>
    </Stack>
  );
};

export default SamplerPad;
