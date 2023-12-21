// routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const documentController = require('../controllers/DocumentMasterController');

router.post('/uspDocumentMasterInsUpDel', documentController.uspDocumentMasterInsUpDel);

module.exports = router;