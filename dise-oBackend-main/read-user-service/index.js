// delete-user-service/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./user.model");
const cloudinary = require("./config/cloudinary");

app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  const users = await User.find({ deleted: false });
  for (const user of users) {
    if (user.avatar) {
      user.avatar = cloudinary.url(user.avatar, {
        width: 500,
        height: 500,
        Crop: "fill",
      });
    }
  }
  res.status(200).send(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user.avatar) {
    user.avatar = cloudinary.url(user.avatar, {
      width: 500,
      height: 500,
      Crop: "fill",
    });
  }
  res.status(200).send(user);
});

mongoose.connect(
  "mongodb://mongo:27017"
);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () =>
  console.log(`Servicio de lectura de usuarios corriendo en el puerto ${PORT}`)
);
