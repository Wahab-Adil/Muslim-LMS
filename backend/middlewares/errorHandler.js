const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.send({
    message: err.message,
    stack: process.env.NODE_ENV === "muslim" ? err.stack : null,
  });
};
export default errorHandler;
