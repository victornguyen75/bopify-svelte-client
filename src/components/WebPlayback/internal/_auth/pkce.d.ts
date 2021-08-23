declare class PKCE {
    private auth_obj;
    private state;
    constructor(client_id: string, redirect_uri?: string, scopes?: string[]);
    /**
     * Initialize. Checks if user gave access to app.
     * @param callback return reference to this object.
     */
    init(callback: any): void;
    /**
     * Checks if any users info is saved, and uses it to login the user.
     * If no info found, will redirect user to log in with spotify and give access to the app.
     */
    login(): Promise<unknown>;
    /**
     * __Logs current user out.__
     * Nuking cookies, client won't remeber user anymore.
     * Will need an full authorization the next time.
     */
    logout(): void;
    /**
     * Get current access token. This will also refresh the token if it has expired.
     */
    getToken(): Promise<string>;
    /**
     * Exchange `code` for an access token
     */
    private requestToken;
    /**
     * Refresh access token. Needs an refresh_token for exchange.
     * A refresh token that has been obtained throught PKCE is valid
     * for access token exchange once. After which it becomes invalid.
     */
    private refreshToken;
    /**
     * Save gained tokens to cookies for later usage.
     */
    private saveTokens;
}
export { PKCE };
