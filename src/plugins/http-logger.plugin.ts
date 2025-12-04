/**
 * HTTP Logger Plugin
 * ==================
 * Logs incoming HTTP requests with structured logging using Winston
 */

import { Elysia } from "elysia";
import { log } from "../utils/logger";

/**
 * HTTP Logger Plugin
 * Logs all incoming HTTP requests with method, URL, and timestamp
 */
export const httpLoggerPlugin = new Elysia({ name: 'http-logger' })
    .derive(() => {
        return {
            startTime: Date.now(),
            requestId: crypto.randomUUID(),
        };
    })
    .onBeforeHandle(({ request, requestId }) => {
        // Log incoming request
        log.http(`${request.method} ${request.url}`, {
            requestId,
            method: request.method,
            url: request.url,
            userAgent: request.headers.get("user-agent") || "unknown",
        });
    })
    .onAfterHandle(({ request, set, startTime, requestId }) => {
        const duration = Date.now() - startTime;
        const statusCode = set.status;
        console.log("");

        log.http(`${request.method} ${request.url}`, {
            requestId,
            statusCode,
            duration: `${duration}ms`,
            method: request.method,
            url: request.url,
        });
    });
