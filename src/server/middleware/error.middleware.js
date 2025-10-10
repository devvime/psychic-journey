export const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json(
    err.toJSON ?
      err.toJSON() :
      {
        success: false,
        message: err.message.replace('JsonError: ', '')
      }
  );
}