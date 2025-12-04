export const successResponse = <T = any>(
    data: T,
    message: string = "Success"
) => {
    return {
        success: true,
        message,
        data,
    };
};

export const errorResponse = (
    message: string = "Error",
    code: number = 500,
    error?: any
) => {
    return {
        success: false,
        message,
        code,
        error,
    };
};
