<script lang="ts">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { onMount, onDestroy } from 'svelte';
import { loadSpotifyPlayer, STATUS, setDevice } from './internal/_utils';
import { PKCE } from './internal/_auth/pkce';
import BasicPlayer from './internal/_basicPlayer.svelte';

import { theme, darkThemePlayer, lightThemePlayer } from "../ThemeProvider";

/**
 * Spotify Authenticator
 */
let authenticator;
/**
 * Current player instance
 */
let player;
/**
 * Current players playback state
 */
let playbackState;
/**
 * Spotify client_id for authentication
 */
export let client_id;
/**
 * Redirect uri for authorization, use the uri where you will use this component.
 */
export let redirect_uri = null;
/**
 * Scopes list
 */
export let scopes = null;
/**
 * Player name
 */
export let name = 'Svelte Web Player';
/**
 * Player volume
 */
export let volume = 0.5;
/* Parameters needed for authorization */
/* let auth: AuthorizationObject = {
  client_id,
  redirect_uri,
  scopes,
  state
}; */
/**
 * Light/Dark Mode Theme colors
 */
$: themePlayer = $theme.name === "light" ? lightThemePlayer : darkThemePlayer;
/* Component state at initialization */
let initialState = {
    deviceId: '',
    error: '',
    errorType: '',
    isActive: false,
    isInitializing: false,
    isPlaying: false,
    isUnsupported: false,
    status: STATUS.IDLE,
    accessToken: '',
};
/**
 * Create & hook listeners to our player. Finally add it to Spotify Connect
 */
const initializePlayer = () => {
    // We need to wait before auth is initialized then we come here
    internalState = Object.assign(Object.assign({}, internalState), { isInitializing: true });
    player = new window.Spotify.Player({
        getOAuthToken: (cb) => __awaiter(void 0, void 0, void 0, function* () {
            // This will run every time player.connect()
            // when user's token has expired.
            let token = yield authenticator.getToken();
            internalState = Object.assign(Object.assign({}, internalState), { accessToken: token });
            cb(token);
        }),
        name,
        volume,
    });
    player.addListener('ready', handlePlayerStatus);
    player.addListener('not_ready', handlePlayerStatus);
    player.addListener('player_state_changed', handlePlayerStateChange);
    player.addListener('initialization_error', (error) => {
        handlePlayerError('initialization_error', error.message);
    });
    player.addListener('authentication_error', (error) => {
        handlePlayerError('authentication_error', error.message);
    });
    player.addListener('playback_error', (error) => {
        handlePlayerError('playback_error', error.message);
    });
    // Add player to Spotify Connect
    player.connect();
};
/**
 * Handler for player status changes.
 * Triggered when add our player to Spotify Connect
 */
const handlePlayerStatus = ({ device_id }) => __awaiter(void 0, void 0, void 0, function* () {
    internalState = Object.assign(Object.assign({}, internalState), { deviceId: device_id, isInitializing: false, status: device_id ? STATUS.READY : STATUS.IDLE });
});
/**
* Main source of info on our player. If we interact with the player - we will get an state change.
* This will also fire "in random intervals".
* However, to get an accurate song position, we need to create an interval when songs are playing.
*/
const handlePlayerStateChange = (_state) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        playbackState = _state; // This is relayed to the user
        if (_state) {
            internalState = Object.assign(Object.assign({}, internalState), { error: '', errorType: '', isActive: true });
        }
        else {
            internalState = Object.assign(Object.assign({}, internalState), { isActive: false, isPlaying: false });
        }
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * Errors from Spotify will get funned here.
 */
const handlePlayerError = (type, message) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = internalState;
    const isPlaybackError = type === 'playback_error';
    const isInitializationError = type === 'initialization_error';
    let nextStatus = status;
    if (player && !isPlaybackError)
        yield player.disconnect();
    if (isInitializationError) {
        nextStatus = STATUS.UNSUPPORTED;
        // Give the option to the user to select and different device?
        /* ({ devices = [] } = await getDevices(token)); */
    }
    if (!isInitializationError && !isPlaybackError) {
        nextStatus = STATUS.ERROR;
    }
    internalState = Object.assign(Object.assign({}, internalState), { error: message, errorType: type, isInitializing: false, isUnsupported: isInitializationError, status: nextStatus });
});
onMount(() => __awaiter(void 0, void 0, void 0, function* () {
    /* Player Mounted - Before initializing Player - Check Auth status. */
    internalState = Object.assign(Object.assign({}, internalState), { status: STATUS.INIT });
    if (!authenticator) {
        var tmpObj = new PKCE(client_id, redirect_uri, scopes);
        // https://stackoverflow.com/questions/43431550/async-await-class-constructor
        tmpObj.init(function () {
            authenticator = tmpObj;
        });
    }
    if (isAuthorized) {
        if (!window.onSpotifyWebPlaybackSDKReady) {
            window.onSpotifyWebPlaybackSDKReady = initializePlayer;
        }
        else {
            initializePlayer();
        }
    }
    else {
        // Template - as it will else throw errors
        window.onSpotifyWebPlaybackSDKReady = () => { };
    }
    // Will this cause race conditions?
    yield loadSpotifyPlayer();
}));
onDestroy(() => {
    // Toggle state that component is destroyed?
    // Remove player from Spotify Connect
    if (player)
        player.disconnect();
});
/**
 * Handle the logic on slots
 */
$: internalState = initialState;
$: isReady = [STATUS.READY, STATUS.UNSUPPORTED].indexOf(internalState.status) >= 0;
$: isLoading = [STATUS.INIT].indexOf(internalState.status) >= 0;
/**
 * Spotify Authorization info
 */
// let authContext: AuthorizationContext;
/**
 * Triggered when an authorization token is assigned!
 */
/* const onAuthorized = (event: { detail?: any }) => {
  isAuthorized = true;
  initializePlayer();
} */
$: isAuthorized = false;
/**
 * Function that will prompt to give access to your app or logs the current user in.
 */
export function login() {
    if (!authenticator)
        return;
    authenticator.login().then((success) => {
        if (success) {
            isAuthorized = true;
            initializePlayer();
        }
    });
}
/**
 * Log user out and clear everything.
 */
export function logout() {
    if (!authenticator)
        return;
    authenticator.logout();
    isAuthorized = false;
}
/**
 * Select current device as playback device
*/
export function selectDevice() {
    if (!internalState.deviceId) {
        console.log('[Player] No device found');
        return;
    }
    setDevice(internalState.accessToken, internalState.deviceId);
    document.dispatchEvent(new CustomEvent("login-success", { detail: { state: internalState } } ))
}
</script>

<!--
  @component
  Spotify Web Playback
-->

<!-- Handle Spotify Authorization -->
<!-- <SpotifyAuth bind:this={authContext} {auth} on:success={onAuthorized} /> -->

<slot 
  player={player} 
  state={playbackState} 
  error={{type: internalState.errorType, message: internalState.error}}
  internal={{...internalState, isAuthorized, isReady, isLoading }}
  name="all"
  >
</slot>

<slot />

{#if !$$slots.all}

  {#if isAuthorized}
    {#if isLoading}
      <slot name="loading">Loading...</slot>
    {:else if internalState.error}
      <slot name="error" error={{ type: internalState.errorType, message: internalState.error }}>{internalState.errorType}: {internalState.error}</slot>
    {:else if !internalState.isActive}
      <slot name="waiting">
        <button on:click={() => selectDevice()}>Select this device</button>
      </slot>
    {/if}
    {#if isReady && internalState.isActive}
      <slot name="player" player={player} state={playbackState}>
        <BasicPlayer {themePlayer} {player} state={playbackState} />
      </slot>
    {/if}
    {#if !isLoading}
      <slot name="logout"></slot>
    {/if}
  {:else}
    <slot name="login">
      <button on:click={() => login()}>Login</button>
    </slot>
  {/if}

{/if}

<style>
    button {
        width: 100%;
		padding: .5rem 1rem;
		font-size: 1.25rem !important;
		border-radius: .3rem !important;
		color: #fff;
		background-color: #198754;
		border-color: #198754;
		display: inline-block;
		font-weight: 400;
		line-height: 1.5 !important;
		text-align: center;
		text-decoration: none;
		vertical-align: middle;
		cursor: pointer !important;
		user-select: none;
		border: 1px solid transparent;	
		transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
</style>