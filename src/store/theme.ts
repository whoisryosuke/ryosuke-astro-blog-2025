import { atom } from "nanostores";

export type ColorMode = "light" | "dark";

export type AppTheme = {
  colorMode: ColorMode;
};

export const themeStore = atom<AppTheme>({
  colorMode: "dark",
});

export function updateTheme(themeUpdates: Partial<AppTheme>) {
  themeStore.set({ ...themeStore.get(), ...themeUpdates });
}

export function updateColorMode(colorMode: ColorMode) {
  themeStore.set({ ...themeStore.get(), colorMode });
}
