import React, { useEffect, useRef, useState } from "react";
import Drumpad from "./Drumpad";
import AudioPlayer from "./AudioPlayer";
import InputManager from "./InputManager/InputManager";
import {
  DEFAULT_INPUT_STORE,
  DRUMPAD_TOTAL_KEYS,
  type InputStore,
  type NoteHistory,
  type NoteState,
} from "./types";
import Stack from "../../../primitives/Stack/Stack";
import SampleWaveform from "./SampleWaveform";
import WaveformBars from "./WaveformBars";
import Container from "../../../primitives/Container/Container";
import NoteTracker from "./NoteTracker";
import Button from "../../../primitives/Button/Button";
import { useMeasure } from "@uidotdev/usehooks";
import BioCard from "./BioCard";
import styles from "./SamplerPad.module.css";

function generateRandomSampleTimes() {
  const times = new Array(DRUMPAD_TOTAL_KEYS - 1)
    .fill(0)
    .map(() => Math.random() * DRUMPAD_TOTAL_KEYS);

  // We want it to always start at 0,
  times.push(0);

  const randomTimes = times.sort((a, b) => a - b);

  // console.log("randomTimes", randomTimes);

  return randomTimes;
}

const INPUT_END_TIME_CHECK = 4200;

type Props = {};

const SamplerPad = (props: Props) => {
  const [input, setInput] = useState<InputStore>(DEFAULT_INPUT_STORE());
  const inputCache = useRef<InputStore>(DEFAULT_INPUT_STORE());
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [buffer, setBuffer] = useState<AudioBuffer | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [sampleTimes, setSampleTimes] = useState<number[]>([]);
  const [noteHistory, setNoteHistory] = useState<NoteHistory>([]);
  const [playerState, setPlayerState] = useState({
    playing: false,
    time: 0,
    totalTime: INPUT_END_TIME_CHECK,
  });
  const timerRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null,
  );
  const timeRef = useRef(0);
  const prevTimeRef = useRef<number | null>(null);
  const lastInputTimeRef = useRef(0);
  const isPlaying = useRef(false);
  const [ref, { width, height }] = useMeasure();

  const syncTimer = (now: number) => {
    if (!prevTimeRef.current) prevTimeRef.current = now;
    const delta = now - prevTimeRef.current;
    prevTimeRef.current = now;

    timeRef.current += delta;
    setPlayerState((prev) => ({
      ...prev,
      time: timeRef.current,
      // As we set the time, we also update the total length as needed
      // If we exceed the default length, or any previous length, use latest time
      totalTime: Math.max(
        prev.totalTime,
        timeRef.current,
        INPUT_END_TIME_CHECK,
      ),
    }));

    // Check if input has been a while...
    const isPastTime =
      timeRef.current - lastInputTimeRef.current > INPUT_END_TIME_CHECK;
    // const noNotesPlaying = !Object.values(input).find((value) => value.pressed);
    if (isPastTime) {
      console.log("stopping playback");
      // Slide time back if needed to get rid of empty time
      // We go back to last input time or total time -- whichever is bigger
      const timeCheck = timeRef.current - INPUT_END_TIME_CHECK;
      const newTime = Math.max(timeCheck, playerState.totalTime);
      timeRef.current = newTime;

      // Stop gameplay + subtract from total time as needed
      setPlayerState((prev) => ({
        ...prev,
        playing: false,
        totalTime: newTime,
      }));
      isPlaying.current = false;
    }

    // Loop!
    timerRef.current = requestAnimationFrame(syncTimer);
  };

  useEffect(() => {
    if (playerState.playing) {
      timerRef.current = requestAnimationFrame(syncTimer);
    }
    if (!playerState.playing && timerRef.current) {
      cancelAnimationFrame(timerRef.current);
    }
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [playerState.playing]);

  console.log("playerState", playerState);

  const handleInput = (noteIndex: number, pressed: boolean) => {
    console.log("input!", noteIndex, pressed);
    // New input?
    if (inputCache.current[noteIndex].pressed == pressed) return;

    // Sync input to state
    setInput((prev) => ({
      ...prev,
      [noteIndex]: {
        ...prev[noteIndex],
        pressed,
      },
    }));
    inputCache.current[noteIndex].pressed = pressed;

    // Check if we're playing, if not, activate
    if (!isPlaying.current && pressed) {
      console.log("starting playback...");
      timeRef.current = 0;
      prevTimeRef.current = 0;
      setPlayerState((prev) => ({
        ...prev,
        playing: true,
        time: 0,
      }));
      isPlaying.current = true;
    }

    // Save note history
    if (pressed) {
      setNoteHistory((prev) => [
        ...prev,
        {
          note: noteIndex,
          pressed,
          time: timeRef.current,
          duration: -1,
        },
      ]);
    } else {
      // Released? Set the duration of note
      console.log("note released", noteIndex);
      setNoteHistory((prev) => {
        const lastNote = prev.findLastIndex(
          (note) => note.note == noteIndex && note.pressed,
        );
        if (lastNote < 0) return prev;

        return prev.map((note, index) => {
          if (index == lastNote) {
            return {
              ...note,
              pressed: false,
              duration: timeRef.current - note.time,
            };
          }
          return note;
        });
      });
    }

    // Log input time
    lastInputTimeRef.current = timeRef.current;
  };

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

  const handleReset = () => {
    setPlayerState((prev) => ({
      time: 0,
      playing: false,
      totalTime: INPUT_END_TIME_CHECK,
    }));
    setNoteHistory([]);
    timeRef.current = 0;
    prevTimeRef.current = 0;
    isPlaying.current = false;
  };

  return (
    <Stack horizontal responsive className={styles.Container}>
      <Stack ref={ref} className={styles.MainContent}>
        <SampleWaveform
          width={width ?? 420}
          height={width ? width * 0.15 : 200}
          buffer={buffer}
        />
        <NoteTracker
          playerState={playerState}
          noteHistory={noteHistory}
          width={width ?? 420}
          height={width ? width * 0.25 : 200}
          // height={height ?? 100}
        />
        <Stack responsive>
          <Button onClick={handleReset} outline>
            Reset
          </Button>
        </Stack>
        <Drumpad
          input={input}
          setInput={handleInput}
          createContext={createContext}
        />
      </Stack>
      <Stack className={styles.SideContent}>
        <Stack>
          <BioCard />
          <h2>
            I experiment on the cutting edge and prototype visually captivating
            and functional products for the future.
          </h2>
        </Stack>
        {/* <div>
          {noteHistory.map((note) => (
            <div key={`${note.note}-${note.time}`}>
              [{note.note}]: {note.time} / {note.duration}
            </div>
          ))}
        </div> */}
      </Stack>

      <WaveformBars analyser={analyser} />
      <InputManager
        input={input}
        setInput={handleInput}
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
  );
};

export default SamplerPad;
