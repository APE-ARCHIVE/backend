import { t } from "elysia";

export const RegisterSchema = t.Object({
    username: t.String(),
    email: t.String({ format: "email" }),
    password: t.String({ minLength: 6 }),
});

export const LoginSchema = t.Object({
    email: t.String({ format: "email" }),
    password: t.String(),
});
