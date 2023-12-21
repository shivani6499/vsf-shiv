const express = require('express');
const router = express.Router();
const localityController = require('../controllers/localityController');

// Locality routes
router.post('/', localityController.createLocality);
router.get('/', localityController.getLocalities);
router.get('/:id', localityController.getLocalityById);
router.put('/:id', localityController.updateLocality);
router.delete('/:id', localityController.deleteLocality);

module.exports = router;
