import { generateCodeChallengeFromVerifier, getCookie } from "./utils";
import { fallbackValues, cookieKeys } from './config';
const endpoints = {
    auth: 'https://accounts.spotify.com/authorize',
    token: 'https://accounts.spotify.com/api/token'
};
export const redirectToAuth = async (auth) => {
    var _a;
    const verifier = getCookie(cookieKeys.code_verifier);
    if (!verifier)
        throw Error('Issues with PKCE code_verifier!');
    const code_challenge = await generateCodeChallengeFromVerifier(verifier);
    const params = {
        client_id: auth.client_id,
        response_type: 'code',
        redirect_uri: auth.redirect_uri || `${window.location.protocol}//${window.location.host}${window.location.pathname}`,
        code_challenge_method: 'S256',
        code_challenge,
        state: auth.state || fallbackValues.state,
        scope: ((_a = auth.scopes) === null || _a === void 0 ? void 0 : _a.join(' ')) || fallbackValues.scopes.join(' '),
    };
    const qs = new URLSearchParams(params);
    return `${endpoints.auth}?${qs.toString()}`;
};
export const getAccessToken = async (auth, code) => {
    try {
        const code_verifier = getCookie(cookieKeys.code_verifier);
        if (!code_verifier)
            throw Error('Issues with PKCE code_verifier!');
        const body = {
            client_id: auth.client_id,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: auth.redirect_uri || `${window.location.protocol}//${window.location.host}${window.location.pathname}`,
            code_verifier
        };
        const response = await fetch(endpoints.token, {
            body: new URLSearchParams(body),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
        });
        if (response.status === 200) {
            const json = await response.json();
            return json;
        }
        else {
            console.log('[Auth] Invalid response while fetcing token!');
            console.log('[Auth]', response.status, response.statusText, response);
        }
    }
    catch (error) {
        console.log('[Auth] Fatal error!', error);
    }
};
export const refreshAccessToken = async (auth, code) => {
    const body = {
        client_id: auth.client_id,
        grant_type: 'refresh_token',
        refresh_token: code,
    };
    const response = await fetch(endpoints.token, {
        body: new URLSearchParams(body),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
    });
    if (response.status === 200) {
        const json = await response.json();
        return json;
    }
    else {
        console.log('[Auth] Invalid response while refreshing token!');
        console.log(response.status, response.statusText);
    }
};
