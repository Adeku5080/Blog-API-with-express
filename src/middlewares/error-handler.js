const CustomAPIErrors = require("../../errors/custom-error");

errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIErrors) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "internal server error" });
};

module.exports = errorHandlerMiddleware;
