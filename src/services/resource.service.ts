import { prisma } from "../config/database";
import { ResourceStatus, Prisma } from "@prisma/client";

interface GetResourcesQuery {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: ResourceStatus;
}

export const resourceService = {
    /**
     * Get resources with pagination and filtering
     */
    getResources: async (query: GetResourcesQuery) => {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;

        const where: Prisma.ResourceWhereInput = {
            status: query.status || ResourceStatus.APPROVED,
        };

        if (query.search) {
            where.OR = [
                { title: { contains: query.search, mode: 'insensitive' } },
                { description: { contains: query.search, mode: 'insensitive' } },
            ];
        }

        if (query.category) {
            where.categories = {
                some: {
                    slug: query.category
                }
            };
        }

        const [resources, total] = await Promise.all([
            prisma.resource.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    categories: true,
                    uploader: {
                        select: {
                            id: true,
                            name: true,
                            role: true
                        }
                    }
                }
            }),
            prisma.resource.count({ where })
        ]);

        return {
            data: resources,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    },

    /**
     * Get resource by ID
     */
    getResourceById: async (id: string) => {
        return await prisma.resource.findUnique({
            where: { id },
            include: {
                categories: true,
                uploader: {
                    select: {
                        id: true,
                        name: true,
                        role: true
                    }
                }
            }
        });
    }
};
