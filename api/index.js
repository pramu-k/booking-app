const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Place = require("./models/Place");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const app = express();
const fs = require("fs");

mongoose.connect(process.env.MONGO_URL);

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "asdasdssklfsdhvhfdiohvnmncxmnmcxnv";

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(cookieParser());

app.get("/test", (req, res) => {
  res.json("test okay");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          (error, token) => {
            if (error) throw error;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.json("Wrong Password");
      }
    } else {
      res.status(404).json("not found");
    }
  } catch (error) {
    console.log(error);
    res.status(422).json(error);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  console.log(req.cookies);
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, decodedToken) => {
      try {
        if (error) {
          if (error.name == "TokenExpiredError") {
            console.log(error);
            res.clearCookie("token").json("token expired");
            return;
          }
        }
        const userData = await User.findById(decodedToken.id);
        const { name, email, _id } = userData;
        res.json({ name, email, _id });
      } catch (catchError) {
        console.log(catchError);
      }
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const dest = path.join(__dirname, "uploads", newName);
  //const dest2= __dirname+'/uploads/'+newName;

  const fileName = await imageDownloader.image({
    url: link,
    dest: dest,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];

    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    let newPath = path + "." + extension;
    fs.renameSync(path, newPath);
    newPath = newPath.replace("uploads\\", "");
    uploadedFiles.push(newPath);
  }
  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    pricePerNight,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (error, decodedToken) => {
    if (error) throw error;
    const placeDoc = await Place.create({
      owner: decodedToken.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      pricePerNight,
    });
    res.json(placeDoc);
  });
});

app.get('/places',async (req,res)=>{
  const placeList = await Place.find();
  res.json(placeList);
})

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (error, decodedToken) => {
    if (error) throw error;
    const { id } = decodedToken;
    const placeList = await Place.find({ owner: id });
    res.json(placeList);
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  const placeData = await Place.findById(id);
  res.json(placeData);
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (error, decodedToken) => {
    if (error) throw error;

    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      pricePerNight,
    } = req.body;

    const placeDoc = await Place.findById(id);
    if (decodedToken.id === placeDoc.owner.toString()) {
      await Place.updateOne(
        { _id: id },
        {
          $set: {
            owner: decodedToken.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            pricePerNight,
          },
        }
      ).then((result) => {
        res.status(200).json("success");
      });
    }
  });
});
app.listen(4000);
