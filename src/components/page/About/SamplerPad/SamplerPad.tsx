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
  type PlayerState,
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
import Quote from "./Quote";
import {
  AUDIO_CLIP_NAMES,
  type AudioClipCache,
  type AudioClipNames,
} from "./audio-clips";

const INPUT_END_TIME_CHECK = 4200;

type Props = {};

const SamplerPad = (props: Props) => {
  const [input, setInput] = useState<InputStore>(DEFAULT_INPUT_STORE());
  const inputCache = useRef<InputStore>(DEFAULT_INPUT_STORE());
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [buffers, setBuffers] = useState<AudioClipCache>({} as AudioClipCache);
  const [selectedClip, setSelectedClip] = useState<AudioClipNames>("Ryo");
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [noteHistory, setNoteHistory] = useState<NoteHistory>([]);
  const [playerState, setPlayerState] = useState<PlayerState>({
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
      setNoteHistory((prev) =>
        prev.map((item) => {
          item.saved = true;
          return item;
        }),
      );
      isPlaying.current = false;
    }

    // Loop!
    timerRef.current = requestAnimationFrame(syncTimer);
  };

  // Run a timer when "playing"
  // We use this to sync timer to state then send to components like NoteTracker
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

  /**
   * Handles input from all devices (mouse click, keyboard, etc)
   */
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
          saved: false,
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

    // Set selected clips
    const currentClipName =
      AUDIO_CLIP_NAMES[((noteIndex + 1) % AUDIO_CLIP_NAMES.length) - 1];
    setSelectedClip(currentClipName);
  };

  // Initialize audio context
  useEffect(() => {
    console.log("sample waveform init");
    // Create analyser and get buffer data
    const ctx = createContext();
    const analyserNode = ctx.createAnalyser();
    // @TODO: Create a global gain node (instead of per-key)

    // Configure analyser
    analyserNode.fftSize = 1024;
    analyserNode.connect(ctx.destination);

    setAnalyser(analyserNode);
  }, []);

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
  const loadAudio = async (name = "C4") => {
    if (!audioCtx) return;
    const response = await fetch(`/music/${name}.mp3`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    setBuffers((prev) => ({
      ...prev,
      [name]: audioBuffer,
    }));
  };

  const loadAllAudio = () => {
    AUDIO_CLIP_NAMES.forEach((name) => {
      loadAudio(name);
    });
  };

  // Loads all audio clips once the audio context has initialized
  useEffect(() => {
    if (audioCtx) loadAllAudio();
  }, [audioCtx]);

  /**
   * Resets player state completely (including removing notes)
   */
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

  /**
   * Restarts playback from the beginning
   */
  const handlePlay = () => {
    setPlayerState((prev) => ({
      ...prev,
      time: 0,
      playing: true,
    }));
    timeRef.current = 0;
    prevTimeRef.current = 0;
    isPlaying.current = true;
  };

  const isPlayBtnDisabled = noteHistory.length <= 0 && playerState.playing;

  return (
    <Stack horizontal responsive className={styles.Container}>
      <Stack ref={ref} className={styles.MainContent}>
        <SampleWaveform
          width={width ? width - 59 : 420}
          height={width ? width * 0.15 : 200}
          buffer={buffers[selectedClip]}
        />
        <NoteTracker
          playerState={playerState}
          noteHistory={noteHistory}
          width={width ? width - 59 : 420}
          height={width ? width * 0.25 : 200}
          // height={height ?? 100}
        />
        <Stack horizontal>
          <Button onClick={handlePlay} outline disabled={isPlayBtnDisabled}>
            {isPlayBtnDisabled ? "Keep jamming" : "Play"}
          </Button>
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
          <Quote input={input} />
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
        buffers={buffers}
        analyser={analyser}
        noteHistory={noteHistory}
        playerState={playerState}
      />
    </Stack>
  );
};

export default SamplerPad;
