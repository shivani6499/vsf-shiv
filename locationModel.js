const mssql = require('mssql');

async function findLocationByName(locationName) {
    try {
      const result = await mssql.query`
        SELECT TOP (1) * FROM [dbo].[tblLocation] WHERE LocationName = ${locationName};
      `;
  
      // Check if result.recordset is undefined or empty
      if (!result.recordset || result.recordset.length === 0) {
        return null; // Or you can return an empty object or handle it as needed
      }
  
      return result.recordset[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
async function createLocation(locationName, CountryId, StateId, CityId, IsActive) {
  try {
    const result = await mssql.query`
      INSERT INTO [VFS].[dbo].[tblLocation] (LocationName, CountryId, StateId, CityId, IsActive, CreatedOn)
      VALUES (${locationName}, ${CountryId}, ${StateId}, ${CityId}, ${IsActive}, GETDATE());
    `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getLocations() {
  try {
    const result = await mssql.query`
      SELECT TOP (1000)
        [Ncode],
        [LocationName],
        [CountryId],
        [StateId],
        [CityId],
        [IsActive],
        [CreatedOn],
        [CreatedBy],
        [ModifiedOn],
        [ModifiedBy]
      FROM [VFS].[dbo].[tblLocation];
    `;
    return result.recordset;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getLocationById(id) {
  try {
    const result = await mssql.query`
      SELECT TOP (1)
        [Ncode],
        [LocationName],
        [CountryId],
        [StateId],
        [CityId],
        [IsActive],
        [CreatedOn],
        [CreatedBy],
        [ModifiedOn],
        [ModifiedBy]
      FROM [VFS].[dbo].[tblLocation]
      WHERE Ncode = ${id};
    `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateLocation(id, locationName, CountryId, StateId, CityId, IsActive) {
  try {
    const result = await mssql.query`
      UPDATE [VFS].[dbo].[tblLocation]
      SET LocationName = ${locationName},
          CountryId = ${CountryId},
          StateId = ${StateId},
          CityId = ${CityId},
          IsActive = ${IsActive},
          ModifiedOn = GETDATE()
      WHERE Ncode = ${id};
    `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteLocation(id) {
  try {
    const result = await mssql.query`
      DELETE FROM [VFS].[dbo].[tblLocation]
      WHERE Ncode = ${id};
    `;
    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  findLocationByName,
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
