const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Nome deve ter entre 2 e 30 caracteres';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Nome não pode estar vazio';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'E-mail inválido';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'E-mail não pode estar vazio';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Senha deve ter no minimo 6 caracteres';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Senha não pode estar vazia';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'A confirmação da senha deve ser identica';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
