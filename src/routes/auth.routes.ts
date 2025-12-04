import { Elysia } from "elysia";
import * as authController from "../controllers/auth.controller";
import { GoogleLoginDTO, RefreshTokenDTO } from "../dto/auth.dto";
import { isAuthenticated } from "../middlewares/auth.middleware";

export const authRoutes = (app: Elysia) =>
    app.group("/auth", (app) =>
        app
            .post("/google", authController.googleLogin, {
                body: GoogleLoginDTO,
                detail: {
                    summary: "Google Login/Signup",
                    tags: ["Auth"]
                }
            })
            .post("/refresh", authController.refreshToken, {
                body: RefreshTokenDTO,
                detail: {
                    summary: "Refresh Access Token",
                    tags: ["Auth"]
                }
            })
            .use(isAuthenticated)
            .get("/me", authController.getMe, {
                detail: {
                    summary: "Get Current User Profile",
                    tags: ["Auth"],
                    security: [{ BearerAuth: [] }]
                }
            })
    );