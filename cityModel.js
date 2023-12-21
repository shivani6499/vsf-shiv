const mssql = require('mssql');

async function findCityByName(cityName) {
  try {
    const result = await mssql.query`
      SELECT TOP (1) * FROM [VFS].[dbo].[tblCity] WHERE CityName = ${cityName};
    `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createCity(CityName, CountryId, StateId, IsActive) {
  try {
    const result = await mssql.query`
      EXEC USP_CityInsUpDel 
        @Ncode = 0,
        @Mode = 'I',
        @CityName = ${CityName},
        @CountryId = ${CountryId},
        @StateId = ${StateId},
        @IsActive = ${IsActive};
    `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getCities() {
  try {
    const result = await mssql.query`
        SELECT 
        [Ncode],
        [CityName],
        [CountryId],
        [CountryName],
        [StateId],
        [StateName],
        [IsActive],
        [CreatedOn],
        [ModifiedOn]
      FROM [VFS].[dbo].[VW_City];
    `;
    return result.recordset;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getCityById(id) {
  try {
    const result = await mssql.query`
      SELECT 
        [Ncode],
        [CityName],
        [CountryId],
        [CountryName],
        [StateId],
        [StateName],
        [IsActive],
        [CreatedOn],
        [ModifiedOn]
      FROM [VFS].[dbo].[VW_City]
      WHERE Ncode = ${id};
    `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateCity(id, CityName, CountryId, StateId, IsActive) {
  try {
    const result = await mssql.query`
      EXEC USP_CityInsUpDel 
        @Ncode = ${id},
        @Mode = 'U',
        @CityName = ${CityName},
        @CountryId = ${CountryId},
        @StateId = ${StateId},
        @IsActive = ${IsActive};
       
    `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteCity(id) {
  try {
    const result = await mssql.query`
      EXEC USP_CityInsUpDel 
      @Ncode = ${id},
      @Mode = 'D',
      @CityName = '',  
      @CountryId = 0, 
      @StateId = 0,    
      @IsActive = '';  
    `;
    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = {
  createCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
  findCityByName,
};
