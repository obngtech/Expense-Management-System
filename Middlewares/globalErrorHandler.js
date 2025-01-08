const globalErrorHandler = async (err, req, res, next) => {
  console.log("Error: ", err.message);

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({ message });
};

module.exports = globalErrorHandler;
