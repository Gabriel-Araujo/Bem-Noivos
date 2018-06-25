const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'E-mail inválido';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'E-mail não pode estar vazio';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Senha não pode estar vazia';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
