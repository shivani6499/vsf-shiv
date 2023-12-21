const stateModel = require('../models/stateModel');
async function createState(req, res) {
  try {
    const { StateName, StateShortName, CountryId, IsActive, Code } = req.body;

    if (!StateName || !CountryId || !IsActive) {
      return res.status(400).json({
        message: 'State name, country ID, and status are required',
      });
    }

    const existingState = await stateModel.findStateByName(StateName);

    if (existingState) {
      return res.status(400).json({
        message: 'State with the same name already exists',
      });
    }

    const newState = await stateModel.createState(StateName, StateShortName, CountryId, IsActive, Code);
    res.status(200).json({
      message: 'State Name Inserted Successfully',
      newState,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


async function getStates(req, res) {
  try {
    const states = await stateModel.getStates();
    res.json(states);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


async function getStateById(req, res) {
  try {
    const { id } = req.params;
    const state = await stateModel.getStateById(id);
    res.json(state);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function updateState(req, res) {
  try {
    const { id } = req.params;
    const { StateName, StateShortName, CountryId, IsActive, Code } = req.body;

    if (!['I', 'U', 'D'].includes(IsActive)) {
      return res.status(400).json({
        message: 'Invalid mode',
      });
    }

    const updatedState = await stateModel.updateState(id, StateName, StateShortName, CountryId, IsActive, Code);
    res.json({
      message: 'State Name Updated Successfully',
      updatedState,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteState(req, res) {
  try {
    const { id } = req.params;

    const deleted = await stateModel.deleteState(id);

    if (deleted) {
      res.json({
        message: `State with ID ${id} deleted successfully`,
      });
    } else {
      res.status(404).json({
        message: `State with ID ${id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}



module.exports = {
  createState,
  getStates,
  getStateById,
  updateState,
  deleteState,
};


