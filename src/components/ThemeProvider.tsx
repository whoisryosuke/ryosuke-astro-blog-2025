import React, { useEffect } from "react";
import { themeStore, updateColorMode, type ColorMode } from "../store/theme";

export const ThemeProvider = () => {
  useEffect(() => {
    // Detect user's system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Set initial value based on system preference
    updateColorMode(mediaQuery.matches ? "dark" : "light");

    // Listen for changes to system preference
    const handleChange = (e: MediaQueryListEvent) => {
      updateColorMode(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleColorMode = () => {
    const prevColorMode = themeStore.get().colorMode;
    updateColorMode(prevColorMode === "light" ? "dark" : "light");
  };

  return <></>;
};
