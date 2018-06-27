const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateServiceInput(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.name = 'Título deve ter entre 2 e 30 caracteres';
  }

  if (Validator.isEmpty(data.title)) {
    errors.name = 'Título não pode estar vazio';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Descrição não pode estar vazio';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
