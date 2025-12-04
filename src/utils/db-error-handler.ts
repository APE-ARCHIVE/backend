/**
 * Database Error Handler
 * =======================
 * Utility for handling Prisma database errors and converting them to meaningful error messages
 * Parses constraint violations, unique violations, and other database errors
 */

import { BadRequestError, ConflictError, NotFoundError, InternalServerError } from "./error";

/**
 * Map of unique field names to user-friendly messages
 */
const UNIQUE_CONSTRAINT_MESSAGES: Record<string, string> = {
    email: "This email is already in use",
    phoneNumber: "This phone number is already registered",
    phone_number: "This phone number is already registered",
    whatsappNumber: "This WhatsApp number is already in use",
    whatsapp_number: "This WhatsApp number is already in use",
    code: "This code already exists",
    token: "This token already exists",
    username: "This username is already taken",
};

/**
 * Map of common Prisma error codes to error types
 */
enum PrismaErrorCode {
    UNIQUE_CONSTRAINT = "P2002", // Unique constraint failed
    FOREIGN_KEY_CONSTRAINT = "P2003", // Foreign key constraint failed
    NOT_FOUND = "P2025", // Record not found
    RECORD_NOT_FOUND = "P2018", // Record not found
    SYNTAX_ERROR = "P2028", // Query interpretation error
    REQUIRED_FIELD = "P2011", // Required field missing
    VALIDATION_ERROR = "P2024", // Validation error
}

/**
 * Extract constraint field name from Prisma unique constraint error
 * Error format: "Unique constraint failed on the fields: (`field1`,`field2`)"
 */
function extractConstraintField(meta: any): string {
    if (!meta || !meta.target) return "unknown field";

    if (Array.isArray(meta.target)) {
        return meta.target[0] || "unknown field";
    }

    return meta.target || "unknown field";
}

/**
 * Parse Prisma database errors and convert to application errors
 *
 * @param error - The error thrown by Prisma
 * @param context - Additional context for error logging (e.g., which operation failed)
 * @returns Appropriate application error (BadRequestError, ConflictError, NotFoundError, or InternalServerError)
 */
export function parseDatabaseError(error: any, context: string = "database operation"): Error {
    // Check if it's a Prisma error
    if (error.code) {
        console.warn(`Database error in ${context}:`, {
            code: error.code,
            message: error.message,
            meta: error.meta,
        });

        switch (error.code) {
            case PrismaErrorCode.UNIQUE_CONSTRAINT: {
                // Handle unique constraint violations
                const field = extractConstraintField(error.meta);
                const userFriendlyMessage = UNIQUE_CONSTRAINT_MESSAGES[field] || `${field} already exists`;
                return new ConflictError(userFriendlyMessage);
            }

            case PrismaErrorCode.FOREIGN_KEY_CONSTRAINT: {
                // Handle foreign key constraint violations
                return new BadRequestError("Referenced resource does not exist or cannot be deleted");
            }

            case PrismaErrorCode.NOT_FOUND:
            case PrismaErrorCode.RECORD_NOT_FOUND: {
                // Handle record not found
                return new NotFoundError("Record not found");
            }

            case PrismaErrorCode.REQUIRED_FIELD: {
                // Handle missing required fields
                const field = error.meta?.fieldName || "required field";
                return new BadRequestError(`${field} is required`);
            }

            case PrismaErrorCode.VALIDATION_ERROR: {
                // Handle validation errors
                return new BadRequestError("Invalid data provided");
            }

            case PrismaErrorCode.SYNTAX_ERROR: {
                // Handle syntax errors (usually indicates a bug, not user error)
                console.error("Syntax error in database query:", error);
                return new InternalServerError("An unexpected database error occurred");
            }

            default: {
                // Log any unhandled Prisma error codes
                console.warn(`Unhandled Prisma error code: ${error.code}`, error);
                return new InternalServerError("Database operation failed");
            }
        }
    }

    // Check if it's a standard database error (not Prisma)
    if (error.name === "PrismaClientInitializationError") {
        console.error("Database connection error:", error);
        return new InternalServerError("Database connection failed");
    }

    if (error.name === "PrismaClientRustPanicError") {
        console.error("Critical database error:", error);
        return new InternalServerError("A critical database error occurred");
    }

    // If it's not a Prisma error, just return it as-is
    return error;
}

/**
 * Safely execute a Prisma operation and handle errors
 * Converts database errors to meaningful application errors
 *
 * Usage:
 * const user = await safePrismaOperation(
 *   () => prisma.user.create({ data: userData }),
 *   "create user"
 * );
 *
 * @param operation - Async function that performs the Prisma operation
 * @param context - Description of the operation for error logging
 * @returns Result of the operation or throws a meaningful error
 */
export async function safePrismaOperation<T>(
    operation: () => Promise<T>,
    context: string = "database operation"
): Promise<T> {
    try {
        return await operation();
    } catch (error) {
        throw parseDatabaseError(error, context);
    }
}
