import { writable } from "svelte/store";
import darkTheme from "./theme/darkTheme";
import lightTheme from "./theme/lightTheme";

export const theme = writable(lightTheme);

export const toggleTheme = (themeName) => {
  if (themeName === "light") {
    theme.set(darkTheme);
  } else {
    theme.set(lightTheme);
  }
};
