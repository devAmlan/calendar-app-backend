exports.sendSuccess = (res, payload, message = "", statusCode = 200) => {
  return res.status(statusCode).send({
    data: payload,
    message,
  });
};

exports.createError = (message, statusCode, info = {}) => {
  return { message, statusCode, info };
};
