import constants from "./constants.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    switch (statusCode) {
        case constants.BAD_REQUEST:
            res.status(400).json({
                title: "Bad Request",
                message: "The request is invalid",
                stackTrace: err.stack,
            });
            break;
            
        case constants.FORBIDDEN:
            res.status(403).json({
                title: "Forbidden",
                message: "The request is forbidden",
                stackTrace: err.stack,
            });
            break;
            
        case constants.NOT_FOUND:
            res.status(404).json({
                title: "Not Found",
                message: "The requested resource is not found",
                stackTrace: err.stack,
            });
            break;
            
        case constants.UNAUTHORIZED:
            res.status(401).json({
                title: "Unauthorized",
                message: "You are not authorized to access this",
                stackTrace: err.stack,
            });
            break;
            
        case constants.SERVER_ERROR:
            res.status(500).json({
                title: "Server Error",
                message: "There was an error processing your request",
                stackTrace: err.stack,
            });
            break;

        case constants.VALIDATION_ERROR:    
            res.status(400).json({
                title: "Validation Error",
                message: "The server could not  validate the data",
                stakTrace: err.stack,
            })

        case constants.CONFLICT: 
        res.status(409).json({
            title: "Conflict",
            message: "The data conflicts existing data",
            stackTrace: err.stack,
        })    
            
        default:
            res.status(500).json({
                title: "Unexpected Error",
                message: "An unexpected error occurred",
                stackTrace: err.stack,
            });
            break;
    }
};

export default errorHandler;
