require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

const app = express();

// Serve images statically
app.use("/uploads", express.static("uploads"));

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://7tvhfcbm-5173.inc1.devtunnels.ms",
    "https://7tvhfcbm-4200.inc1.devtunnels.ms"
  ], // Use an array for multiple origins
  optionsSuccessStatus: 200, // For legacy browser support
};


app.use(cors(corsOptions));

//Middleware to parse JSON
app.use(express.json());

//Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

routes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
