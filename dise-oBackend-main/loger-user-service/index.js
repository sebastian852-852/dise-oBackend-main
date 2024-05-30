const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const upload = require("./config/multer");

const app = express(); // Create an express app

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

app.get("/", (req, res) => {
  res.status(200).json({});
});

const routesLoger = require("./loger/loger.route");
app.use("/SearchLogger", upload.single("avatar"), routesLoger);

mongoose.connect(
  "mongodb://mongo:27017"
);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () =>
  console.log(`Servicio de loger de usuarios corriendo en el puerto ${PORT}`)
);
