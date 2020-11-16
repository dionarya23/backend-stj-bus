const HttpStatus = require('http-status-codes');

const errorHandler = res => err => {
  console.error(err.message);
  const statusCode = err.status || HttpStatus.INTERNAL_SERVER_ERROR
  return res.status(statusCode).json({ status: statusCode, message: err.message }).end();
};

module.exports = fn => (req, res) => {
  fn(req, res)
    .then(result => res.status(result.status).json(result).end())
    .catch(errorHandler(res));
};