// const express = require('express');
// const dbConfig = require('./config/dbConfig');
// const countryRoutes = require('./routes/countryRoutes');
// const fieldMasterRoutes = require('./routes/fieldMasterRoutes');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 3000;

// dbConfig.connectDB();
// app.use(bodyParser.json());
// app.use(express.json());
// app.use('/countries', countryRoutes);
// app.use('/api', fieldMasterRoutes);


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });













const express = require("express");
const dbConfig = require("./config/dbConfig");
const countryRoutes=require("./routes/countryRoutes");
const documentRoutes = require('./routes/documentRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const sequelize = require('./config/dbConfig');

sequelize
  .sync()
  .then(() => {
    console.log("Database and tables created!");
  })
  .catch((error) => {
    console.error("Error creating database and tables:", error);
  });
app.use("/countries", countryRoutes);
app.use('/documents', documentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






//http://localhost:3000/countries
//URL: http://localhost:3000/states(deleted pending)
//http://localhost:3000/city
// http://localhost:3000/location(CHECK inserted messg not show in postman )
//http://localhost:3000/locality()





