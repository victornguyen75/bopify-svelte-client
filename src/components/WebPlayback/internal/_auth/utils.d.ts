export declare function generateCodeChallengeFromVerifier(v: any): Promise<string>;
/**
 * Generate code verifier and save it to cookie `cname`
 */
export declare function generateCodeVerifier(cname: string): void;
export declare function getHash(): {
    code?: string;
};
export declare function getCookie(cname: string): string;
