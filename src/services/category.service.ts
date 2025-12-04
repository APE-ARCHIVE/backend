import { prisma } from "../config/database";

export const categoryService = {
    /**
     * Get all categories
     */
    getAllCategories: async () => {
        return await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        });
    },

    /**
     * Get category by slug
     */
    getCategoryBySlug: async (slug: string) => {
        return await prisma.category.findUnique({
            where: { slug }
        });
    }
};
