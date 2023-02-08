// Import mongoose:
const mongoose = require("mongoose");

// Linker avec la variable environnement:
const connectionString = process.env.DB_CONNECTION_STRING;

// Établir la connection:
mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Successfully connected to the Hackatweet Database"))
  .catch((errorMessage) => console.error(errorMessage));
