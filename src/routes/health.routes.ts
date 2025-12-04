import { Elysia } from "elysia";
import { log } from "../utils/logger";

export const healthRoutes = new Elysia({ prefix: "/health" })
    .get("/", () => {
        log.info("Health check requested");
        return {
            status: "ok",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        };
    });
