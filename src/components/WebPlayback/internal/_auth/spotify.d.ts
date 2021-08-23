import type { AccessTokenResponse, AuthorizationObject } from "$lib/types/common";
export declare const redirectToAuth: (auth: AuthorizationObject) => Promise<string>;
export declare const getAccessToken: (auth: AuthorizationObject, code: string) => Promise<AccessTokenResponse>;
export declare const refreshAccessToken: (auth: AuthorizationObject, code: string) => Promise<AccessTokenResponse>;
