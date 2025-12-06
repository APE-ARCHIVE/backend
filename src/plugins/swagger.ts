import { swagger } from "@elysiajs/swagger";

export const swaggerPlugin = swagger({
    provider: 'scalar',
    documentation: {
        info: {
            title: "ElysiaJS API",
            version: "1.0.0",
            description: "API Documentation for ElysiaJS Sample Project",
        },
    },
    scalarConfig: {
        theme: 'mars',
    }
});
