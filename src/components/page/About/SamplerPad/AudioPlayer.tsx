import React, { useEffect, useRef, useState } from "react";
import { DRUMPAD_TOTAL_KEYS, type InputStore } from "./types";

type AudioNodeSequence = {
  sample: AudioBufferSourceNode;
  gain: GainNode;
};

type Props = {
  audioCtx: AudioContext | null;
  input: InputStore;
  buffer: AudioBuffer | null;
};

const AudioPlayer = ({ audioCtx, input, buffer }: Props) => {
  const nodes = useRef<AudioNodeSequence[]>(
    new Array(DRUMPAD_TOTAL_KEYS).fill({
      sample: null,
      gain: null,
    }),
  );
  const sampleNode = useRef<AudioBufferSourceNode[]>(null);
  const gainNode = useRef<GainNode[]>(null);

  const playAudio = (index: number) => {
    if (!buffer || !audioCtx) return;

    nodes.current[index] = {
      sample: audioCtx.createBufferSource(),
      gain: audioCtx.createGain(),
    };

    console.log("playing audio...", audioCtx.state);
    // Create a new audio nodes
    nodes.current[index].sample.buffer = buffer;
    nodes.current[index].gain.gain.value = 1;
    nodes.current[index].sample.connect(nodes.current[index].gain);
    nodes.current[index].gain.connect(audioCtx.destination);

    // Actually play audio now
    nodes.current[index].sample.start();
  };

  const stopAudio = (index: number) => {
    if (!audioCtx || !gainNode.current || !sampleNode.current) return;

    console.log("stopping audio...", audioCtx.state);
    const { currentTime } = audioCtx;

    // Smoothly ramp volume down over 0.1s to avoid "popping"
    nodes.current[index].gain.gain.exponentialRampToValueAtTime(
      0.0001,
      currentTime + 0.1,
    );

    // Physically stop the node after the fade
    nodes.current[index].sample.stop(currentTime + 0.1);
  };

  useEffect(() => {
    const inputCache = Object.entries(input);
    const pressedKeys = inputCache.filter(([key, state]) => state.pressed);
    const releasedKeys = inputCache.filter(([key, state]) => !state.pressed);

    pressedKeys.forEach(([key]) => {
      console.log("pressed key", key);
      playAudio(parseInt(key));
    });

    releasedKeys.forEach(([key]) => {
      console.log("released key", key);
      stopAudio(parseInt(key));
    });
  }, [input]);

  return <div>AudioPlayer</div>;
};

export default AudioPlayer;
