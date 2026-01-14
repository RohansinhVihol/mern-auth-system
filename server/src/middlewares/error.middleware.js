
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err); 

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    statusCode,
    success: statusCode < 400,
    message,
    data: {}
  });
};
