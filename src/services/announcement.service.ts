import { prisma } from "../config/database";

export const announcementService = {
    /**
     * Get all active announcements
     */
    getAnnouncements: async () => {
        return await prisma.announcement.findMany({
            where: {
                isActive: true,
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } }
                ]
            },
            orderBy: [
                { priority: 'desc' }, // CRITICAL first, then HIGH, then NORMAL
                { createdAt: 'desc' }
            ],
            include: {
                author: {
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
