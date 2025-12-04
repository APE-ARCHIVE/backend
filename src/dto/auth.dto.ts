import { t } from "elysia";

export const GoogleLoginDTO = t.Object({
    idToken: t.String({ minLength: 1, description: "Google ID Token" })
});

export const RefreshTokenDTO = t.Object({
    refreshToken: t.String({ minLength: 1, description: "Refresh Token" })
});

export type GoogleLoginBody = typeof GoogleLoginDTO.static;
export type RefreshTokenBody = typeof RefreshTokenDTO.static;
