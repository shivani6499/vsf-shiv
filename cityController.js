const cityModel = require('../models/cityModel');

async function createCity(req, res) {
  try {
    const { CityName, CountryId, StateId, IsActive } = req.body;

    if (!CityName || !CountryId || !StateId || !IsActive) {
      return res.status(400).json({
        message: 'City name, country ID, state ID, and status are required',
      });
    }

    const existingCity = await cityModel.findCityByName(CityName);

    if (existingCity) {
      return res.status(400).json({
        message: 'City with the same name already exists',
      });
    }

    const newCity = await cityModel.createCity(CityName, CountryId, StateId, IsActive);
    res.status(200).json({
      message: 'City Inserted Successfully',
      newCity,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getCities(req, res) {
  try {
    const cities = await cityModel.getCities();
    res.json(cities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getCityById(req, res) {
  try {
    const { id } = req.params;
    const city = await cityModel.getCityById(id);
    res.json(city);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function updateCity(req, res) {
  try {
    const { id } = req.params;
    const { Mode,CityName, CountryId, StateId, IsActive } = req.body;

    if (!['I', 'U', 'D'].includes(IsActive)) {
      return res.status(400).json({
        message: 'Invalid mode',
      });
    }

    const updatedCity = await cityModel.updateCity(id, Mode,CityName, CountryId, StateId, IsActive);
    res.json({
      message: 'City Updated Successfully',
      updatedCity,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteCity(req, res) {
  try {
    const { id } = req.params;

    const deleted = await cityModel.deleteCity(id);

    if (deleted) {
      res.json({
        message: `City with ID ${id} deleted successfully`,
      });
    } else {
      res.status(404).json({
        message: `City with ID ${id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  createCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
};
