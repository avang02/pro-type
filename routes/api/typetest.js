const express = require('express');
const router = express.Router();
const typingtestCtrl = require('../../controllers/api/typetest');

// All paths start with '/api/typingtest'

// POST /api/typetest/:userId/new
router.post('/:userId/new', typingtestCtrl.create);
// GET /api/typetest/tests
router.get('/:userId/tests', typingtestCtrl.getAllTest);
// GET /api/typetest/:typeId
router.get('/:typeId', typingtestCtrl.getTypeTest);
// DELETE /api/typetest/:typeId/delete
router.delete('/:typeId/delete', typingtestCtrl.deleteTypeTest);

module.exports = router;