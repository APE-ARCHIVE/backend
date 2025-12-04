import { Elysia } from "elysia";
import { categoryService } from "../services/category.service";
import { successResponse } from "../utils/response";

export const categoryController = new Elysia()
    .get("/", async () => {
        const categories = await categoryService.getAllCategories();
        return successResponse(categories, "Categories fetched successfully");
    });
