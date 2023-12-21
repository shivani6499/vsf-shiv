const locationModel = require('../models/locationModel');

async function createLocation(req, res) {
    try {
      const { locationName, CountryId, StateId, CityId, IsActive } = req.body;
  
      if (!locationName || !CountryId || !StateId || !CityId || !IsActive) {
        return res.status(400).json({
          message: 'Location name, country ID, state ID, city ID, and status are required',
        });
      }
  
      const existingLocation = await locationModel.findLocationByName(locationName);
  
      if (existingLocation) {
        return res.status(400).json({
          message: 'Location with the same name already exists',
        });
      }
  
      const newLocation = await locationModel.createLocation(locationName, CountryId, StateId, CityId, IsActive);
      
      // Check if the data was inserted successfully
      if (newLocation) {
        return res.status(200).json({
          message: 'Location Inserted Successfully',
          newLocation,
        });
      } else {
        // Handle the case where the data was not inserted
        return res.status(500).json({
          message: 'Failed to insert location',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  

async function getLocations(req, res) {
  try {
    const locations = await locationModel.getLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getLocationById(req, res) {
  try {
    const { id } = req.params;
    const location = await locationModel.getLocationById(id);
    res.json(location);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function updateLocation(req, res) {
  try {
    const { id } = req.params;
    const { locationName, CountryId, StateId, CityId, IsActive } = req.body;

    if (!['I', 'U', 'D'].includes(IsActive)) {
      return res.status(400).json({
        message: 'Invalid mode',
      });
    }

    const updatedLocation = await locationModel.updateLocation(id, locationName, CountryId, StateId, CityId, IsActive);
    res.json({
      message: 'Location Updated Successfully',
      updatedLocation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteLocation(req, res) {
  try {
    const { id } = req.params;

    const deleted = await locationModel.deleteLocation(id);

    if (deleted) {
      res.json({
        message: `Location with ID ${id} deleted successfully`,
      });
    } else {
      res.status(404).json({
        message: `Location with ID ${id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
