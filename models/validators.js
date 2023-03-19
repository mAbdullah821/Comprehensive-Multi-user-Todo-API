module.exports.strLengthValidator = (str, field, { min, max }) => {
  if (min && str.length < min)
    throw new Error(
      `The <${field}> length must be more than or equal to ${min}, got: [${str}] with length: ${str.length}`
    );
  if (max && str.length > max)
    throw new Error(
      `The <${field}> length must be less than or equal to ${max}, got: [${str}] with length: ${str.length}`
    );
  return true;
};
