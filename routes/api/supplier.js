const express = require('express');
const passport = require('passport');

const router = express.Router();

// Load Supplier Model
const Supplier = require('../../models/Supplier');
// Load User Model
// const User = require('../../models/User');

// Load input validation
const validateSupplierInput = require('../../validation/supplier');
const validateServiceInput = require('../../validation/service');

// @route   GET api/supplier/test
// @desc    Test supplier route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'supplier works' }));

// @route   GET api/supplier
// @desc    Get current users supplier
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Supplier.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(supplier => {
      if (!supplier) {
        errors.nosupplier = 'Não foi encontrado um fornecerdor para esse usuário';
        return res.status(404).json(errors);
      }
      res.json(supplier);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/supplier/all
// @desc    Get current all suppliers
// @access  public
router.get('/all', (req, res) => {
  const errors = {};

  Supplier.find()
    .populate('user', ['name', 'avatar'])
    .then(suppliers => {
      if (!suppliers) {
        errors.nosuppliers = 'Não existem fornecedores cadastrados';
        return res.status(404).json(errors);
      }
      res.json(suppliers);
    })
    .catch(() => res.status(404).json({ nosuppliers: 'Não existem fornecedores cadastrados' }));
});

// @route   GET api/supplier/path/:path
// @desc    Get current supplier by path
// @access  public
router.get('/path/:path', (req, res) => {
  const errors = {};

  Supplier.findOne({ path: req.params.path })
    .populate('user', ['name', 'avatar'])
    .then(supplier => {
      if (!supplier) {
        errors.nosupplier = 'Não foi encontrado um fornecerdor para esse usuário';
        return res.status(404).json(errors);
      }
      res.json(supplier);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/supplier/user/:user_id
// @desc    Get current supplier by user ID
// @access  public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Supplier.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(supplier => {
      if (!supplier) {
        errors.nosupplier = 'Não foi encontrado um fornecerdor para esse usuário';
        return res.status(404).json(errors);
      }
      res.json(supplier);
    })
    .catch(() => res.status(404).json({ nosupplier: 'Não foi encontrado um fornecerdor para esse usuário' }));
});

// @route   POST api/supplier
// @desc    Create or Edit User Supplier
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateSupplierInput(req.body);
  // Check Validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Get fields
  const supplierFields = {};
  supplierFields.user = req.user.id;
  if (req.body.company) supplierFields.company = req.body.company;
  if (req.body.path) supplierFields.path = req.body.path;
  if (req.body.brandLogo) supplierFields.brandLogo = req.body.brandLogo;
  if (req.body.profileCover) supplierFields.profileCover = req.body.profileCover;
  if (req.body.description) supplierFields.description = req.body.description;
  if (req.body.state) supplierFields.state = req.body.state;
  if (req.body.city) supplierFields.city = req.body.city;
  if (req.body.addressCode) supplierFields.addressCode = req.body.addressCode;
  if (req.body.address) supplierFields.address = req.body.address;
  if (req.body.location) supplierFields.location = req.body.location;
  if (req.body.website) supplierFields.website = req.body.website;

  // phones
  if (typeof req.body.phones !== 'undefined') {
    supplierFields.phones = req.body.phones.split(',');
  }

  // service Areas
  if (typeof req.body.serviceAreas !== 'undefined') {
    supplierFields.serviceAreas = req.body.serviceAreas.split(',');
  }

  // social
  supplierFields.social = {};
  if (req.body.facebook) supplierFields.social.facebook = req.body.facebook;
  if (req.body.instagram) supplierFields.social.instagram = req.body.instagram;
  if (req.body.youtube) supplierFields.social.youtube = req.body.youtube;

  Supplier.findOne({ user: req.user.id })
    .then(supplier => {
      if (supplier) {
        // Update
        Supplier.findOneAndUpdate(
          { user: req.user.id },
          { $set: supplierFields },
          { new: true },
        ).then(supplierFound => res.json(supplierFound));
      } else {
        // Create
        // Check handle existe
        Supplier.findOne({ path: supplierFields.path })
          .then(supplierFindOne => {
            if (supplierFindOne) {
              errors.path = 'Caminho já existe';
              return res.status(400).json(errors);
            }

            // Save Supplier
            new Supplier(supplierFields)
              .save()
              .then(supplierSaved => res.json(supplierSaved));
          });
      }
    });
});

// @route   POST api/supplier/service
// @desc    Add a service to supplier
// @access  Private
router.post('/service', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateServiceInput(req.body);
  // Check Validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Supplier.findOne({ user: req.user.id })
    .then(supplier => {
      const newService = {
        title: req.body.title,
        description: req.body.description,
        priceType: req.body.priceType,
        priceValue: req.body.priceValue,
      };

      supplier.services.unshift(newService);
      supplier.save().then(supplierSaved => res.json(supplierSaved));
    });
});

module.exports = router;
