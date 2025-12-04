import { Elysia } from "elysia";
import { resourceController } from "../controllers/resource.controller";

export const resourceRoutes = new Elysia({ prefix: "/resources" })
    .use(resourceController);
