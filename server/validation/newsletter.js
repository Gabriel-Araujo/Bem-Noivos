const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateNewsletterInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'E-mail inválido';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'E-mail não pode estar vazio';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
