import { t } from "elysia";

/**
 * Validation Middleware
 * =====================
 * Elysia uses TypeBox (t) for validation natively.
 * This file exports 't' and can be used for shared schemas.
 */

export const validate = t;

// Example shared schemas
export const commonSchemas = {
    pagination: t.Object({
        page: t.Optional(t.Number({ minimum: 1 })),
        limit: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
    }),
    idParam: t.Object({
        id: t.String(),
    }),
};
