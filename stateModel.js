const mssql = require('mssql');

async function findStateByName(stateName) {
  try {
    const result = await mssql.query `
      SELECT TOP (1) * FROM [VFS].[dbo].[tblState] WHERE StateName = ${stateName};
    `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createState(StateName, StateShortName, CountryId, IsActive, Code) {
  try {
    const result = await mssql.query `
      EXEC USP_StateInsUpDel 
        @Ncode = 0,
        @Mode = 'I',
        @StateName = ${StateName},
        @StateShortName=${StateShortName},
        @CountryId = ${CountryId},
        @IsActive = ${IsActive},
        @Code = ${Code};
    `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getStates() {
  try {
    const result = await mssql.query `
      SELECT
        [ncode],
        [StateName],
        [StateShortName],
        [CountryId],
        [IsActive],
        [CreatedOn],
        [CreatedBy],
        [ModifiedOn],
        [ModifiedBy]
      FROM [VFS].[dbo].[tblState];
    `;
    return result.recordset;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getStateById(id) {
  try {
    const result = await mssql.query `
      SELECT 
        [ncode],
        [StateName],
        [StateShortName],
        [CountryId],
        [CountryName],
        [IsActive],
        [CreatedOn],
        [CreatedBy],
        [ModifiedOn],
        [ModifiedBy]
      FROM [VFS].[dbo].[VW_State]
      WHERE ncode = ${id};
    `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}
async function updateState(id, StateName, StateShortName, CountryId, IsActive, Code) {
  try {
    const result = await mssql.query `
        EXEC USP_StateInsUpDel 
          @Ncode = ${id},
          @Mode = 'U',
          @StateName = ${StateName},
          @StateShortName = ${StateShortName},
          @CountryId = ${CountryId},
          @IsActive = ${IsActive},
          @Code = ${Code};
      `;
    return result.recordset[0];
  } catch (error) {
    throw new Error(error.message);
  }
}


async function deleteState(id) {
  try {
    const result = await mssql.query `
    EXEC USP_StateInsUpDel 
    @Ncode = ${id},
    @Mode = 'D',
    @StateName = ${StateName},
    @CountryId = ${CountryId},
    @IsActive = ${IsActive},
    @Code = ${Code};
`;
    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createState,
  getStates,
  getStateById,
  updateState,
  deleteState,
  findStateByName
};