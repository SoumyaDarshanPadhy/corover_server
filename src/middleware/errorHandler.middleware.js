function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    console.log(err.stack);
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        data: err.data || null,
        stack: process.env.SERVER === "production" ? null : err.stack,
    });
}

export { errorHandler };
