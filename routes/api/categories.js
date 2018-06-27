const express = require('express');
const passport = require('passport');

const router = express.Router();

// Category model
const Category = require('../../models/Category');

// Validation
const validateCategoryInput = require('../../validation/category');

// @route   GET api/categories/test
// @desc    Tests category route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Category Works' }));

// @route   GET api/categories
// @desc    Get categories
// @access  Public
router.get('/', (req, res) => {
  Category.find()
    .sort({ rank: -1 })
    .then(categories => res.json(categories))
    .catch(() => res.status(404).json({ nocategoriesfound: 'Nenhuma categoria encontrada' }));
});

// @route   GET api/categories/:id
// @desc    Get category by id
// @access  Public
router.get('/:id', (req, res) => {
  Category.findById(req.params.id)
    .then(category => res.json(category))
    .catch(() => res.status(404).json({ nocategoryfound: 'Nenhuma categoria encontrada com esse identificador' }));
});

// @route   POST api/categories
// @desc    Create category
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCategoryInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newCategory = new Category({
      title: req.body.title,
      description: req.body.description,
      cover: req.body.cover,
      rank: req.body.rank,
    });

    newCategory.save().then(category => res.json(category));
  },
);

// @route   PUT api/categories
// @desc    Update category
// @access  Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCategoryInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    // Get fields
    const categoryFields = {};
    if (req.body.title) categoryFields.title = req.body.title;
    if (req.body.description) categoryFields.description = req.body.description;
    if (req.body.cover) categoryFields.cover = req.body.cover;
    if (req.body.rank) categoryFields.rank = parseInt(req.body.rank, 10);

    Category.findById(req.params.id).then(category => {
      if (category) {
        console.log(category);
        console.log(categoryFields);
        // Update
        Category.findOneAndUpdate(
          { _id: req.params.id },
          { $set: categoryFields },
          { new: true },
        ).then(categoryUpdated => {
          console.log(categoryUpdated);
          res.json(categoryUpdated);
        }).catch(err => console.log(err));
      } else {
        errors.nocategoryfound = 'Nenhum categoria encontrado com esse identificador';
        res.status(400).json(errors);
      }
    });
  },
);

// @route   DELETE api/categories/:id
// @desc    Delete category
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Check for category owner
    if (req.user.role !== 'ADMIN') {
      return res
        .status(401)
        .json({ notauthorized: 'Não autorizado' });
    }

    Category.findById(req.params.id)
      .then(category => {
        // Delete
        category.remove().then(() => res.json({ success: true }));
      })
      .catch(() => res.status(404).json({ categorynotfound: 'Categoria não encontrado' }));
  },
);

module.exports = router;
