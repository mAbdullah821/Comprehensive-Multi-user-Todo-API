const { oneOf } = require('express-validator');

const sequentialValidation = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }
    next();
  };
};

const optionalAttributesToEdit = (
  attributes,
  locationObject,
  message = 'Attribute is not provided'
) =>
  oneOf(
    attributes.map((attribute) => locationObject(attribute, message).exists()),
    `Provide at least one attribute to edit from: {${attributes.join(', ')}}`
  );

const unique = (dbModel, chain, attribute) => {
  return chain.custom((value) =>
    dbModel.findOne({ [attribute]: value }).then((res) => {
      if (res) {
        throw new Error(`${attribute} already exists`);
      }
    })
  );
};

module.exports = {
  sequentialValidation,
  optionalAttributesToEdit,
  unique,
};
