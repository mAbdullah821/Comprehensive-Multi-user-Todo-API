const errorHandler = function (err) {
  err.statusCode = err.statusCode || 500;

  let errors = err.message;
  if (err.statusCode >= 500) errors = ['internal server error'];

  if (err.message.includes('validation failed'))
    errors = Object.values(err.errors).map(({ message }) => message);
  if (err.code === 11000) errors = ['That <username> is already registered'];
  console.log(err);
  return { errors: { msg: errors } };
};

module.exports = { errorHandler };
