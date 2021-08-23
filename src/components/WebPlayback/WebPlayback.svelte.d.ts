import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        /**
           * Spotify client_id for authentication
           */ client_id: string;
        /**
           * Redirect uri for authorization, use the uri where you will use this component.
           */ redirect_uri?: string;
        /**
           * Scopes list
           */ scopes?: string[];
        /**
           * Player name
           */ name?: string;
        /**
           * Player volume
           */ volume?: number;
        login?: () => void;
        logout?: () => void;
        selectDevice?: () => void;
    };
    events: {
        [evt: string]: any;
    };
    slots: {
        all: {
            player: WebPlaybackPlayer;
            state: WebPlaybackState;
            error: {
                type: string;
                message: string;
            };
            internal: {
                isAuthorized: boolean;
                isReady: boolean;
                isLoading: boolean;
                deviceId: string;
                error: string;
                errorType: string;
                isActive: boolean;
                isInitializing: boolean;
                isPlaying: boolean;
                isUnsupported: boolean;
                status: string;
                accessToken: string;
            };
        };
        default: {};
        loading: {};
        error: {
            error: {
                type: string;
                message: string;
            };
        };
        waiting: {};
        player: {
            player: WebPlaybackPlayer;
            state: WebPlaybackState;
        };
        logout: {};
        login: {};
    };
};
export declare type WebPlaybackProps = typeof __propDef.props;
export declare type WebPlaybackEvents = typeof __propDef.events;
export declare type WebPlaybackSlots = typeof __propDef.slots;
/** Spotify Web Playback */
export default class WebPlayback extends SvelteComponentTyped<WebPlaybackProps, WebPlaybackEvents, WebPlaybackSlots> {
    get login(): () => void;
    get logout(): () => void;
    get selectDevice(): () => void;
}
export {};
