const express = require('express');
const passport = require('passport');

const router = express.Router();

// Service model
const Service = require('../../models/Service');
// Supplier model
const Supplier = require('../../models/Supplier');

// Validation
const validateServiceInput = require('../../validation/service');
const validatePhotoInput = require('../../validation/photo');

// @route   GET api/service/test
// @desc    Tests service route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Service Works' }));

// @route   GET api/services
// @desc    Get services
// @access  Public
router.get('/', (req, res) => {
  Service.find()
    .sort({ rank: -1 })
    .then(services => res.json(services))
    .catch(() => res.status(404).json({ noservicesfound: 'Nenhum serviço encontrado' }));
});

// @route   GET api/services/:id
// @desc    Get service by id
// @access  Public
router.get('/:id', (req, res) => {
  Service.findById(req.params.id)
    .then(service => res.json(service))
    .catch(() => res.status(404).json({ noservicefound: 'Nenhum serviço encontrado com esse identificador' }));
});

// @route   POST api/services/supplier
// @desc    Create service by Supplier
// @access  Private
router.post(
  '/supplier/:supplier_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateServiceInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    // Get fields
    const serviceFields = {};
    serviceFields.supplier = req.params.supplier_id;
    if (req.body.category_id) serviceFields.category = req.body.category_id;
    if (req.body.title) serviceFields.title = req.body.title;
    if (req.body.description) serviceFields.description = req.body.description;
    if (req.body.priceType) serviceFields.priceType = req.body.priceType;
    if (req.body.priceValue) serviceFields.priceValue = req.body.priceValue;
    if (req.body.priceMin) serviceFields.priceMin = req.body.priceMin;
    if (req.body.priceMax) serviceFields.priceMax = req.body.priceMax;
    if (req.body.rank) serviceFields.rank = req.body.rank;

    // Tags - Spilt into array
    if (typeof req.body.tags !== 'undefined') {
      serviceFields.tags = req.body.tags.split(',');
    }

    const newService = new Service(serviceFields);
    newService.save().then(serviceSaved => res.json(serviceSaved));
  },
);

// @route   PUT api/services
// @desc    Update service
// @access  Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateServiceInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    // Get fields
    const serviceFields = {};
    serviceFields.supplier = req.params.supplier_id;
    if (req.body.category) serviceFields.category = req.body.category;
    if (req.body.title) serviceFields.title = req.body.title;
    if (req.body.description) serviceFields.description = req.body.description;
    if (req.body.priceType) serviceFields.priceType = req.body.priceType;
    if (req.body.priceFixed) serviceFields.priceFixed = req.body.priceFixed;
    if (req.body.priceMin) serviceFields.priceMin = req.body.priceMin;
    if (req.body.priceMax) serviceFields.priceMax = req.body.priceMax;
    if (req.body.priceUnit) serviceFields.priceUnit = req.body.priceUnit;
    if (req.body.priceStart) serviceFields.priceStart = req.body.priceStart;
    if (req.body.rank) serviceFields.rank = req.body.rank;

    // Tags - Spilt into array
    if (typeof req.body.tags !== 'undefined') {
      serviceFields.tags = req.body.tags.split(',');
    }

    Service.findById(req.params.id).then(service => {
      if (service) {
        // Update
        Service.findOneAndUpdate(
          { _id: req.params.id },
          { $set: serviceFields },
          { new: true },
        ).then(serviceUpdated => res.json(serviceUpdated));
      } else {
        errors.noservicefound = 'Nenhum serviço encontrado com esse identificador';
        res.status(400).json(errors);
      }
    });
  },
);

// @route   DELETE api/services/:id
// @desc    Delete service
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Supplier.findOne({ user: req.user.id }).then(supplier => {
      Service.findById(req.params.id)
        .then(service => {
          // Check for supplier owner
          if ((supplier.user.toString() !== req.user.id) && (req.user.role === 'ADMIN')) {
            return res
              .status(401)
              .json({ notauthorized: 'Não autorizado' });
          }
          // Delete
          service.remove().then(() => res.json({ success: true }));
        })
        .catch(() => res.status(404).json({ servicenotfound: 'Serviço não encontrado' }));
    });
  },
);


// @route   POST api/services/photo/:id
// @desc    Add photos to service
// @access  Private
router.post(
  '/photo/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePhotoInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Service.findById(req.params.id)
      .then(service => {
        const newPhoto = {
          filename: req.body.filename,
          contentType: req.body.contentType,
        };

        // Add to photos array
        service.photos.unshift(newPhoto);

        // Save
        service.save().then(serviceSaved => res.json(serviceSaved));
      })
      .catch(() => res.status(404).json({ servicenotfound: 'Serviço não encontrado' }));
  },
);

// @route   DELETE api/services/photo/:id/:photo_id
// @desc    Remove comment from service
// @access  Private
router.delete(
  '/photo/:id/:photo_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Service.findById(req.params.id)
      .then(service => {
        // Check to see if photo exists
        if (
          service.photos.filter(
            photo => photo.id.toString() === req.params.photo_id,
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ photonotexists: 'Imagem não existe' });
        }

        // Get remove index
        const removeIndex = service.photos
          .map(item => item.id.toString())
          .indexOf(req.params.photo_id);

        // Splice comment out of array
        service.photos.splice(removeIndex, 1);

        service.save().then(serviceSaved => res.json(serviceSaved));
      })
      .catch(() => res.status(404).json({ servicenotfound: 'Serviço não encontrado' }));
  },
);

module.exports = router;
