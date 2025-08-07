const express = require('express');
const router = express.Router();
const {
  createItem,
  getAllItems,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

router.post('/', createItem);       // CREATE
router.get('/', getAllItems);      // READ ALL
router.put('/:id', updateItem);    // UPDATE
router.delete('/:id', deleteItem); // DELETE

module.exports = router;