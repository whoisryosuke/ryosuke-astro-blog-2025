export type InputState = {
  pressed: boolean;
};
export type InputStore = Record<number, InputState>;

export const DRUMPAD_TOTAL_KEYS = 12;
export const DEFAULT_INPUT_STORE = () =>
  new Array(DRUMPAD_TOTAL_KEYS).fill(0).reduce(
    (merge, _, index) => ({
      ...merge,
      [index]: {
        pressed: false,
      },
    }),
    {},
  );

export type NoteState = {
  note: number;
  pressed: boolean;
  time: number;
  duration: number;
};

export type NoteHistory = NoteState[];
