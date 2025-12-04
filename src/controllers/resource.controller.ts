import { Elysia, t } from "elysia";
import { resourceService } from "../services/resource.service";
import { successResponse, errorResponse } from "../utils/response";
import { ResourceStatus } from "@prisma/client";

export const resourceController = new Elysia()
    .get("/", async ({ query }) => {
        const resources = await resourceService.getResources({
            page: query.page ? Number(query.page) : 1,
            limit: query.limit ? Number(query.limit) : 10,
            search: query.search,
            category: query.category,
            status: query.status as ResourceStatus
        });
        return successResponse(resources, "Resources fetched successfully");
    }, {
        query: t.Object({
            page: t.Optional(t.String()),
            limit: t.Optional(t.String()),
            search: t.Optional(t.String()),
            category: t.Optional(t.String()),
            status: t.Optional(t.Enum(ResourceStatus))
        })
    })
    .get("/:id", async ({ params, set }) => {
        const resource = await resourceService.getResourceById(params.id);
        if (!resource) {
            set.status = 404;
            return errorResponse("Resource not found", 404);
        }
        return successResponse(resource, "Resource fetched successfully");
    });
