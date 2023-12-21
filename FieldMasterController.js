const FieldMaster = require('../models/fieldMasterModel');

async function insertField(req, res) {
  try {
    console.log("hello world")
    const { FieldName, FieldType, FieldValue, FieldRequired, IsActive } = req.body;

    if (!FieldName || !FieldType || !FieldRequired || !IsActive) {
      return res.status(400).json({
        status: 'Error',
        message: 'Required fields are missing in the request body',
      });
    }

  
    const field = await FieldMaster.findOne({ where: { FieldName: 'ExampleField' } });
    console.log("field");
    if (!field ) {
      const newField = await FieldMaster.create({
        FieldName,
        FieldType,
        FieldValue,
        FieldRequired,
        IsActive,
        CreatedOn: new Date(),
      });
      return res.status(200).json({
        status: 'Success',
        message: 'Field Name Inserted Successfully',
        field: newField,
      });
    } else {
      return res.status(400).json({
        status: 'Error',
        message: 'Field Name Already Exists',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Error', message: error.message || 'Internal server error' });

  }
}

async function updateField(req, res) {
  try {
    const { Ncode, FieldName, FieldType, FieldValue, FieldRequired, IsActive } = req.body;

    if (!Ncode || !FieldName || !FieldType || !FieldRequired || !IsActive) {
      return res.status(400).json({
        status: 'Error',
        message: 'Required fields are missing in the request body',
      });
    }

    const field  = await FieldMaster.findOne({
      where: { FieldName, Ncode: { [FieldMaster.Sequelize.Op.not]: Ncode } },
    });

    if (!field ) {
      await FieldMaster.update(
        { FieldName, FieldType, FieldValue, FieldRequired, IsActive, ModifiedOn: new Date() },
        { where: { Ncode } }
      );
      return res.status(200).json({
        status: 'Success',
        message: 'Field Name Updated Successfully',
      });
    } else {
      return res.status(400).json({
        status: 'Error',
        message: 'Field Name Already Exists',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'Error',
      message: 'Internal server error',
    });
  }
}

async function deleteField(req, res) {
  try {
    const { Ncode } = req.body;

    if (!Ncode) {
      return res.status(400).json({
        status: 'Error',
        message: 'Ncode is missing in the request body',
      });
    }

    const deletedCount = await FieldMaster.destroy({
      where: { Ncode },
    });

    if (deletedCount > 0) {
      return res.status(200).json({
        status: 'Success',
        message: 'Field Name Deleted Successfully',
      });
    } else {
      return res.status(400).json({
        status: 'Error',
        message: 'Field Name not found for deletion',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Error', message: error.message });
  }


}

module.exports = {
  insertField,
  updateField,
  deleteField,
};
