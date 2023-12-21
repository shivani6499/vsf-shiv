const mssql = require('mssql');

async function findLocalityByName(localityName) {
  try {
    const result = await mssql.query`
      SELECT TOP (1) * FROM [VFS].[dbo].[tblLocality] WHERE LocalityName = ${localityName};
    `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createLocality(LocalityName, Pincode, CountryId, LocationId, StateId, CityId, IsActive) {
  try {
    const result = await mssql.query`
      EXEC USP_LocalityInsUpDel 
        @Ncode = 0,
        @Mode = 'I',
        @LocalityName = ${LocalityName},
        @Pincode = ${Pincode},
        @CountryId = ${CountryId},
        @LocationId = ${LocationId},  -- Add this line
        @StateId = ${StateId},
        @CityId = ${CityId},
        @IsActive = ${IsActive};
    `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getLocalities() {
  try {
    const result = await mssql.query`
      SELECT TOP (1000)
        [Ncode],
        [LocalityName],
        [Pincode],
        [CountryId],
        [LocationId],
        [StateId],
        [CityId],
        [IsActive],
        [CreatedOn],
        [ModifiedOn]
      FROM [VFS].[dbo].[tblLocality];
    `;
    return result.recordset;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getLocalityById(id) {
  try {
    const result = await mssql.query`
      SELECT TOP (1)
        [Ncode],
        [LocalityName],
        [Pincode],
        [CountryId],
        [LocationId,
        [StateId],
        [CityId],
        [IsActive],
        [CreatedOn],
        [ModifiedOn]
      FROM [VFS].[dbo].[tblLocality]
      WHERE Ncode = ${id};
    `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

// async function updateLocality(id, LocalityName, Pincode, CountryId, LocationId, StateId, CityId, IsActive) {
//   try {
//     const result = await mssql.query`
//       EXEC USP_LocalityInsUpDel 
//         @Ncode = ${id},
//         @Mode = 'U',
//         @LocalityName = ${LocalityName},
//         @Pincode = ${Pincode},
//         @CountryId = ${CountryId},
//         @LocationId = ${LocationId},  -- Add this line
//         @StateId = ${StateId},
//         @CityId = ${CityId},
//         @IsActive = ${IsActive};
//     `;
//     return result.recordset[0];
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

async function updateCountryStatus(id, isActive, countryName) {
  try {
    const result = await mssql.query`
      EXEC USP_CountryInsUpDel 
        @Ncode = ${id},
        @Mode = 'U',
        @CountryName = ${countryName},
        @CountryShortName = '',
        @IsActive = ${isActive};
    `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}


async function deleteLocality(id) {
  try {
    const result = await mssql.query`
      EXEC USP_LocalityInsUpDel 
        @Ncode = ${id},
        @Mode = 'D',
        @LocalityName = '',
        @Pincode = '',
        @CountryId = 0,
        @LocationId = 0,  -- Add this line
        @StateId = 0,
        @CityId = 0,
        @IsActive = 'I';
    `;
    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createLocality,
  getLocalities,
  getLocalityById,
  updateCountryStatus,
  deleteLocality,
  findLocalityByName,
};
