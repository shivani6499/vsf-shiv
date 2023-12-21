// controllers/documentController.js
const { DocumentMaster } = require('../models/DocumentMasterModel');

exports.uspDocumentMasterInsUpDel = async (req, res) => {
  try {
    const { Ncode, Mode, DocumentName, DocumentType, DocumentValue, DocumentRequired, IsActive } = req.body;

    if (Mode === 'I') {
      const existingDocument = await DocumentMaster.findOne({ where: { DocumentName } });

      if (!existingDocument) {
        await DocumentMaster.create({
          DocumentName,
          DocumentType,
          DocumentValue,
          DocumentRequired,
          IsActive,
        });

        res.status(200).json({ status: 'Document Name Inserted Successfully' });
      } else {
        res.status(400).json({ status: 'Document Name Already Exists' });
      }
    } else if (Mode === 'U') {
      const existingDocument = await DocumentMaster.findOne({ where: { DocumentName, Ncode: { [sequelize.Op.ne]: Ncode } } });

      if (!existingDocument) {
        await DocumentMaster.update(
          {
            DocumentName,
            DocumentType,
            DocumentValue,
            DocumentRequired,
            IsActive,
            ModifiedOn: new Date(),
          },
          { where: { Ncode } }
        );

        res.status(200).json({ status: 'Document Name Updated Successfully' });
      } else {
        res.status(400).json({ status: 'Document Name Already Exists' });
      }
    } else if (Mode === 'D') {
      await DocumentMaster.destroy({ where: { Ncode } });

      res.status(200).json({ status: 'Document Name Deleted Successfully' });
    } else {
      res.status(400).json({ status: 'Invalid Mode' });
    }
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error' });
  }
};
