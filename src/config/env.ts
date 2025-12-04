export const env = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/elysia-app",
    JWT_SECRET: process.env.JWT_SECRET || "supersecret",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "supersecret_refresh",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
};
