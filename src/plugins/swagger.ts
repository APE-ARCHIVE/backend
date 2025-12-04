import { swagger } from "@elysiajs/swagger";

export const swaggerPlugin = swagger({
    documentation: {
        info: {
            title: "ElysiaJS API",
            version: "1.0.0",
            description: "API Documentation for ElysiaJS Sample Project",
        },
    },
});
