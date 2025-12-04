import { Elysia } from "elysia";
import { announcementController } from "../controllers/announcement.controller";

export const announcementRoutes = new Elysia({ prefix: "/announcements" })
    .use(announcementController);
