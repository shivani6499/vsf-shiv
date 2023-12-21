
const express = require('express');
const fieldMasterController = require('../controllers/FieldMasterController');

const router = express.Router();


router.post('/fields', fieldMasterController.insertField);
router.put('/fields/:Ncode', fieldMasterController.updateField);
router.delete('/fields/:Ncode', fieldMasterController.deleteField);

module.exports = router;
