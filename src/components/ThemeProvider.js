import { writable } from "svelte/store";
import { darkTheme, darkThemePlayer as darkPlayer } from "./theme/darkTheme";
import {
  lightTheme,
  lightThemePlayer as lightPlayer,
} from "./theme/lightTheme";

export const darkThemePlayer = darkPlayer;
export const lightThemePlayer = lightPlayer;
export const theme = writable(lightTheme);
export const toggleTheme = (themeName) => {
  if (themeName === "light") {
    theme.set(darkTheme);
  } else {
    theme.set(lightTheme);
  }
};
