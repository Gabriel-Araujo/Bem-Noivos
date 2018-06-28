const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSupplierInput(data) {
  const errors = {};

  data.company = !isEmpty(data.company) ? data.company : '';
  data.path = !isEmpty(data.path) ? data.path : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.city = !isEmpty(data.city) ? data.city : '';

  data.phones = !isEmpty(data.phones) ? data.phones : '';
  data.servicesAreas = !isEmpty(data.servicesAreas) ? data.servicesAreas : '';
  data.social = !isEmpty(data.social) ? data.social : '';

  if (!Validator.isLength(data.company, { min: 2, max: 120 })) {
    errors.company = 'Compania deve ter entre 2 e 120 caracteres';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Compania dever ser preenchido';
  }

  if (!Validator.isLength(data.path, { min: 2, max: 120 })) {
    errors.path = 'Caminho deve ter entre 2 e 120 caracteres';
  }

  if (Validator.isEmpty(data.path)) {
    errors.path = 'Caminho dever ser preenchido';
  }

  if (!Validator.isLength(data.state, { min: 2, max: 2 })) {
    errors.state = 'Estado deve ter apenas 2 caracteres';
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = 'Estado dever ser preenchido';
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = 'Cidade dever ser preenchida';
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'URL do site inválida';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.website = 'URL do Facebook inválida';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.website = 'URL do Instagram inválida';
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.website = 'URL do Youtube inválida';
    }
  }

  //
  if (Validator.isEmpty(data.phones)) {
    errors.phones = 'Telefones dever ser preenchidos';
  }

  if (Validator.isEmpty(data.serviceAreas)) {
    errors.serviceAreas = 'Areas de Atuação dever ser preenchidas';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
