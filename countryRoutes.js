const express = require('express');
const router = express.Router()
const countryController = require('../controllers/countryController');
router.post("/",countryController.createCountry );

module.exports = router;