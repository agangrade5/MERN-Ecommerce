import HttpResponse from "../utils/HttpResponse.js";

export const notFound = (req, res, next) => {
    return HttpResponse.notFound(res, `Not Found - ${req.originalUrl}`, 404);
};

export const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || err.code || 500;
    const message = err.message || "Something went wrong";

    return HttpResponse.error(res, message, statusCode);
};
