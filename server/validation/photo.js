const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePhotoInput(data) {
  const errors = {};

  data.filename = !isEmpty(data.filename) ? data.filename : '';

  if (Validator.isEmpty(data.filename)) {
    errors.filename = 'Arquivo não pode estar vazio';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
