function errorHandler(err, req, res, next) {
  // Log the error or perform any additional error handling tasks

  // Set the appropriate status code and send the error response
  let statusCode = 500;
  let errorMessage = 'Internal Server Error';

  // Check for specific error types and customize the response accordingly
  if (err.name === 'ValidationError') {
    // Handle validation errors (e.g., Mongoose validation errors)
    statusCode = 400;
    errorMessage = err.message;
  } else if (err.name === 'UnauthorizedError') {
    // Handle unauthorized errors (e.g., JWT authentication errors)
    statusCode = 401;
    errorMessage = 'Unauthorized';
  } else if (err.name === 'NotFoundError') {
    // Handle not found errors (e.g., resource not found)
    statusCode = 404;
    errorMessage = 'Resource Not Found';
  } else if (err.name === 'CelebrateError') {
    // Handle celebrate errors (e.g., validation errors)
    statusCode = 400;
    errorMessage = err.message;
  }

  res.status(statusCode).json({
    error: {
      message: errorMessage,
    },
  });
}

module.exports = errorHandler;
