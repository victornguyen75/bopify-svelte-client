import Auth from "./Auth.svelte";
import Header from "./Header.svelte";
import SearchBar from "./SearchBar.svelte";
import TrackSearchResults from "./TrackSearchResults.svelte";
import { WebPlayback } from "./WebPlayback";
import GlobalStyles from "./GlobalStyles.svelte";
import DarkModeIcon from "./DarkModeIcon.svelte";
import LightModeIcon from "./LightModeIcon.svelte";
import { playerState } from "./stores";
import {
  theme,
  toggleTheme,
  darkThemePlayer,
  lightThemePlayer,
} from "./ThemeProvider";
export {
  Auth,
  Header,
  SearchBar,
  TrackSearchResults,
  WebPlayback,
  GlobalStyles,
  DarkModeIcon,
  LightModeIcon,
  playerState,
  theme,
  darkThemePlayer,
  lightThemePlayer,
  toggleTheme,
};
