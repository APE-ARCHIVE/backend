import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env";
import { prisma } from "../config/database";
import { BadRequestError, UnauthorizedError } from "../utils/error";
import { Role } from "../models";
import { log } from "../utils/logger";

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

/**
 * Verify Google ID Token and return payload
 */
export const verifyGoogleToken = async (idToken: string) => {
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) throw new Error("Invalid token payload");
        return payload;
    } catch (error) {
        log.error("Google verify error", error as Error);
        throw new BadRequestError("Invalid Google ID Token");
    }
};

/**
 * Login or Signup with Google
 */
export const loginWithGoogle = async (idToken: string) => {
    log.info("Attempting Google login");
    const googlePayload = await verifyGoogleToken(idToken);
    const { email, sub: googleId, name, picture } = googlePayload;

    if (!email) {
        throw new BadRequestError("Email not found in Google Token");
    }

    // Find or Create User
    let user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        log.info("Creating new user from Google login", { email });
        // Create new user
        user = await prisma.user.create({
            data: {
                email,
                googleId,
                name: name || "User",
                imageUrl: picture,
                role: Role.GUEST,
                isOnboarded: false,
            },
        });
    } else if (!user.googleId) {
        log.info("Linking Google ID to existing user", { userId: user.id });
        // Link Google ID if existing user (optional logic)
        user = await prisma.user.update({
            where: { id: user.id },
            data: { googleId, imageUrl: picture || user.imageUrl },
        });
    }

    log.info("Google login successful", { userId: user.id });
    return user;
};

/**
 * Get User by ID
 */
export const getUserById = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        log.warn("User not found", { userId });
        throw new UnauthorizedError("User not found");
    }
    return user;
};

