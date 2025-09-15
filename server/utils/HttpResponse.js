class HttpResponse {
    static success(res, message = "Success", data = {}, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    static error(res, message = "Something went wrong", statusCode = 500, errors = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            ...(errors ? { errors } : {})   // include errors only if passed
        });
    }

    static validation(res, message = "Validation failed", statusCode = 400, errors = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            ...(errors ? { errors } : {})   // include errors only if passed
        });
    }

    static unauthorized(res, message = "Unauthorized", statusCode = 401) {
        return res.status(statusCode).json({
            success: false,
            message
        });
    }

    static notFound(res, message = "Resource not found", statusCode = 404) {
        return res.status(statusCode).json({
            success: false,
            message
        });
    }

    static serverError(res, message = "Internal server error", statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message
        });
    }
}

export default HttpResponse;
