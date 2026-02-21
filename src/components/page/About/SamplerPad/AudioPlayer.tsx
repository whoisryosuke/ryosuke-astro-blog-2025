import React, { useEffect, useRef, useState } from "react";
import { DRUMPAD_TOTAL_KEYS, type InputStore } from "./types";

/**
 * Calculates detune value for audio to pitch sound up or down
 * using a desired piano note
 *
 * @param noteIndex 0 - 12 (C - B white and black notes)
 * @param octave Optional. Number of current octave. Defaults to 4.
 * @returns
 */
function calculateDetune(noteIndex: number, octave: number = 4) {
  const octaveOffset = (octave - 4) * 1200;
  return noteIndex * 100 + octaveOffset;
}

type AudioNodeSequence = {
  sample: AudioBufferSourceNode;
  gain: GainNode;
};

type Props = {
  audioCtx: AudioContext | null;
  input: InputStore;
  buffer: AudioBuffer | null;
  sampleTimes: number[];
  analyser: AnalyserNode | null;
};

const AudioPlayer = ({
  audioCtx,
  input,
  buffer,
  sampleTimes,
  analyser,
}: Props) => {
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

    // console.log("playing audio...", audioCtx.state);
    // Create a new audio nodes
    nodes.current[index].sample.buffer = buffer;
    // Tune sound to current "note" based on button position
    // @TODO: Prob won't need this if we use sample time
    nodes.current[index].sample.detune.value = calculateDetune(index);

    nodes.current[index].gain.gain.value = 0.5;
    nodes.current[index].sample.connect(nodes.current[index].gain);
    if (analyser) {
      nodes.current[index].gain.connect(analyser);
    } else {
      nodes.current[index].gain.connect(audioCtx.destination);
    }

    // Get sample position relative to drum pad
    // We get the start position from our samples
    const start = sampleTimes[index];
    // And the "end time" for clip is next clip's start "time" (or end of audio)
    // "time" here is scaled by the number of keys.
    // So if 0.5 start time = 0.5/12 = that's the percent of our start time on audio duration
    const nextKey = index + 1;
    const nextTime =
      nextKey <= DRUMPAD_TOTAL_KEYS - 1
        ? sampleTimes[nextKey]
        : DRUMPAD_TOTAL_KEYS;

    const scaledTimeSegmentStart =
      (start / DRUMPAD_TOTAL_KEYS) * buffer.duration;
    const scaledTimeSegmentEnd =
      (nextTime / DRUMPAD_TOTAL_KEYS) * buffer.duration;
    const playDuration = scaledTimeSegmentEnd - scaledTimeSegmentStart;

    // console.log(
    //   "playing segment",
    //   scaledTimeSegmentStart,
    //   scaledTimeSegmentEnd,
    //   playDuration,
    // );

    // Actually play audio now
    nodes.current[index].sample.start();
    // nodes.current[index].sample.start(0, scaledTimeSegmentStart, playDuration);
  };

  const stopAudio = (index: number) => {
    if (!audioCtx || !gainNode.current || !sampleNode.current) return;

    // console.log("stopping audio...", audioCtx.state);
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
      // console.log("pressed key", key);
      playAudio(parseInt(key));
    });

    releasedKeys.forEach(([key]) => {
      // console.log("released key", key);
      stopAudio(parseInt(key));
    });
  }, [input]);

  return <></>;
};

export default AudioPlayer;
