import { Elysia } from "elysia";
import { categoryController } from "../controllers/category.controller";

export const categoryRoutes = new Elysia({ prefix: "/categories" })
    .use(categoryController);
