import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        player: WebPlaybackPlayer;
        state: WebPlaybackState;
    };
    events: {
        [evt: string]: any;
    };
    slots: {};
};
export declare type BasicPlayerProps = typeof __propDef.props;
export declare type BasicPlayerEvents = typeof __propDef.events;
export declare type BasicPlayerSlots = typeof __propDef.slots;
export default class BasicPlayer extends SvelteComponentTyped<BasicPlayerProps, BasicPlayerEvents, BasicPlayerSlots> {
}
export {};
