const errorHandler = (err, req, res, next) => {

    const recStatusCode = res.statusCode ? res.statusCode : 500;

    res.status(recStatusCode).json({
        message: err.message,
        stack: process.env.appStatus === "development" ? err.stack : null
    });
};

module.exports = errorHandler;
