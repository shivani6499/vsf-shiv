const Country = require('../models/countryModel');


exports.createCountry = async (req, res) => {
  try {
    console.log("shivani");
    res.send("hello world");
    const { countryName, countryShortName, isActive } = req.body;

    if (!countryName || !isActive) {
      return res.status(400).json({
        message: 'Country name and status are required',
      });
    }

    // Check if the country already exists
    const existingCountry = await Country.findOne({
      where: { countryName }
    });

    if (existingCountry) {
      return res.status(400).json({
        message: 'Country with the same name already exists',
      });
    }

    // If the country doesn't exist, proceed with creating a new one
    const newCountry = await Country.create({
      countryName,
      countryShortName,
      isActive
    });

    res.status(200).json(newCountry);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all countries
exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get a country by ID
exports.getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findByPk(id);

    if (!country) {
      return res.status(404).json({
        message: `Country with ID ${id} not found`,
      });
    }

    res.json(country);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update country status, name, and short name
exports.updateCountryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { countryName, countryShortName, isActive } = req.body;

    if (!countryName || !['I', 'A'].includes(isActive)) {
      return res.status(400).json({
        message: 'Invalid countryName or isActive value',
      });
    }

    await Country.update(
      { countryName, countryShortName, isActive },
      { where: { id } }
    );

    res.json({
      message: 'Country status, name, and short name updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete a country by ID
exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Country.destroy({
      where: { id }
    });

    if (deleted) {
      res.json({
        message: `Country with ID ${id} deleted successfully`,
      });
    } else {
      res.status(404).json({
        message: `Country with ID ${id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

