const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Routes CRUD
router.post('/', userController.createUser);           // CREATE
router.get('/', userController.getAllUsers);           // READ ALL
router.get('/:id', userController.getUserById);        // READ ONE
router.put('/:id', userController.updateUser);         // UPDATE
router.delete('/:id', userController.deleteUser);      // DELETE

module.exports = router;