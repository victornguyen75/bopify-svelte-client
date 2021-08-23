import { SvelteComponentTyped } from "svelte";
import type { AuthorizationObject, AuthorizationState } from '$lib/types/common';
declare const __propDef: {
    props: {
        /**
           * Authorization information provided by the user
           */ auth: AuthorizationObject;
        /**
           * State of authorization
           */ state?: AuthorizationState;
        /**
           * Figure the logic on this. If users has already given access - no need to redirect to auth?
           */ login?: () => Promise<void>;
        /**
           * Nuking cookies, forgetting the user fully.
           * Will need an full authorization the next time.
           */ logout?: () => void;
        /**
           * Get token for Spotify Player. If access token isn't valid anymore - refresh it.
           * Returns valid token.
           */ getToken?: () => Promise<string>;
    };
    events: {
        success: any;
    } & {
        [evt: string]: any;
    };
    slots: {};
};
export declare type IndexProps = typeof __propDef.props;
export declare type IndexEvents = typeof __propDef.events;
export declare type IndexSlots = typeof __propDef.slots;
export default class Index extends SvelteComponentTyped<IndexProps, IndexEvents, IndexSlots> {
    get login(): () => Promise<void>;
    get logout(): () => void;
    get getToken(): () => Promise<string>;
    get auth(): AuthorizationObject;
    /**accessor*/
    set auth(_: AuthorizationObject);
    get state(): AuthorizationState;
    /**accessor*/
    set state(_: AuthorizationState);
}
export {};
