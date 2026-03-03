import React, { useEffect, useRef, useState } from "react";
import {
  DEFAULT_INPUT_STORE,
  DRUMPAD_TOTAL_KEYS,
  type InputStore,
  type NoteHistory,
  type PlayerState,
} from "./types";
import { AUDIO_CLIP_NAMES, type AudioClipCache } from "./audio-clips";

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
  return noteIndex * 50 + octaveOffset;
}

type AudioNodeSequence = {
  sample: AudioBufferSourceNode;
  gain: GainNode;
};

type Props = {
  audioCtx: AudioContext | null;
  input: InputStore;
  buffers: AudioClipCache;
  analyser: AnalyserNode | null;
  noteHistory: NoteHistory;
  playerState: PlayerState;
};

const AudioPlayer = ({
  audioCtx,
  input,
  buffers,
  analyser,
  noteHistory,
  playerState,
}: Props) => {
  const localInputState = useRef(DEFAULT_INPUT_STORE());
  const notesPlayed = useRef<number[]>([]);
  const nodes = useRef<AudioNodeSequence[]>(
    new Array(DRUMPAD_TOTAL_KEYS).fill({
      sample: null,
      gain: null,
    }),
  );

  const playAudio = (index: number) => {
    if (!buffers || !audioCtx) return;

    nodes.current[index] = {
      sample: audioCtx.createBufferSource(),
      gain: audioCtx.createGain(),
    };

    // Create new audio nodes

    // Get the current clip from cache
    // We use the note index to check against array of clip names
    // We use modulo here in case we don't have enough clips for notes (forces it to reuse clips)
    const currentClipName =
      AUDIO_CLIP_NAMES[((index + 1) % AUDIO_CLIP_NAMES.length) - 1];
    const buffer = buffers[currentClipName];

    nodes.current[index].sample.buffer = buffer;
    // Tune sound to current "note" based on button position
    // @TODO: Prob won't need this if we use sample time
    nodes.current[index].sample.detune.value = calculateDetune(index);

    nodes.current[index].gain.gain.value = 0.71;
    nodes.current[index].sample.connect(nodes.current[index].gain);
    if (analyser) {
      nodes.current[index].gain.connect(analyser);
    } else {
      nodes.current[index].gain.connect(audioCtx.destination);
    }

    // Actually play audio now
    nodes.current[index].sample.start();
  };

  const stopAudio = (index: number) => {
    if (!audioCtx) return;

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
    if (!playerState.playing) {
      notesPlayed.current = [];
      return;
    }

    // @TODO: Combine into one loop for perf
    const playableNotes = noteHistory.reduce((merge, note, index) => {
      if (
        note.saved &&
        note.time > playerState.time - 100 &&
        note.time < playerState.time + 100
      ) {
        merge.push(index);
      }
      return merge;
    }, [] as number[]);

    const endingNotes = noteHistory.reduce((merge, note, index) => {
      if (
        note.saved &&
        note.time + note.duration > playerState.time - 100 &&
        note.time + note.duration < playerState.time + 100
      ) {
        merge.push(index);
      }
      return merge;
    }, [] as number[]);

    playableNotes.forEach((noteIndex) => {
      const note = noteHistory[noteIndex];
      if (!notesPlayed.current.includes(noteIndex)) {
        console.log("playing note", note.note, note.time);
        playAudio(note.note);
        notesPlayed.current.push(noteIndex);
      }
    });

    endingNotes.forEach((noteIndex) => {
      const note = noteHistory[noteIndex];
      console.log("ending note", note.note, note.time);
      stopAudio(note.note);
    });
  }, [playerState]);

  useEffect(() => {
    const inputCache = Object.entries(input);
    const pressedKeys = inputCache.filter(([key, state]) => state.pressed);
    const releasedKeys = inputCache.filter(([key, state]) => !state.pressed);

    pressedKeys.forEach(([key]) => {
      // console.log("pressed key", key);
      if (!localInputState.current[key].pressed) {
        playAudio(parseInt(key));
        localInputState.current[key].pressed = true;
      }
    });

    releasedKeys.forEach(([key]) => {
      // console.log("released key", key);
      if (localInputState.current[key].pressed) {
        stopAudio(parseInt(key));
      }
      localInputState.current[key].pressed = false;
    });
  }, [input]);

  return <></>;
};

export default AudioPlayer;
