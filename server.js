import express from "express";
import cors from "cors";
import {
  addMedCat,
  getAllMedCats,
  getMedCatById,
  deleteMedCatById,
  getOthers,
  getOthers2,
} from "./src/meditations/categories.js";
import fileUpload from "express-fileupload";
import {
  addMedToCat,
  deleteMedFromCat,
  getMedFromCatById,
} from "./src/meditations/meditations.js";
import {
  addMessage,
  deleteMessage,
  getAllMessages,
  getMessageById,
} from "./src/messages/messages.js";
import {
  checkLogged,
  login,
  logout,
  register,
  updateUserStats,
  refreshToken,
} from "./src/auth/auth.js";
import {
  addListenCat,
  deleteListenCatById,
  getAllListenCats,
  getbyid,
  getListenCatById,
} from "./src/listen/categories.js";
import {
  addListenToCat,
  deleteListenFromCat,
  getListenFromCatById,
} from "./src/listen/listen.js";
import {
  addpodcastCat,
  deletepodcastCatById,
  getAllpodcastCats,
  getpodcastCatById,
} from "./src/podcast/categories.js";
import {
  addpodcastToCat,
  deletepodcastFromCat,
  getpodcastFromCatById,
} from "./src/podcast/podcast.js";
import {
  addyogaCat,
  deleteyogaCatById,
  getAllyogaCats,
  getyogaCatById,
} from "./src/yoga/categories.js";
import {
  addyogaToCat,
  deleteyogaFromCat,
  getyogaFromCatById,
} from "./src/yoga/yoga.js";
import bodyParser from "body-parser";

import { getHome } from "./src/utils/home.js";
import { getinfos } from "./src/utils/infos.js";

const app = express();

// const bodyParser = require("body-parser");

app.use(fileUpload());
app.use(bodyParser.json({ limit: "1500mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "1500mb",
    extended: true,
    parameterLimit: 500000,
  })
);
app.use(bodyParser.text({ limit: "1500mb" }));

// app.use(express.json({ limit: "1500mb" }));
// app.use(express.urlencoded({ limit: "1500mb" }));

app.use(express.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.front_link);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const PORT = process.env.PORT || 3001;

app.post("/addMedCat", addMedCat);
app.get("/getAllMedCats", getAllMedCats);
app.get("/getMedCatById/:id", getMedCatById);
app.post("/deleteMedCatById", deleteMedCatById);
app.get("/getOthers/:id_cat/:tag", getOthers);
app.get("/getOthers2/:id", getOthers2);

app.post("/addMedToCat", addMedToCat);
app.post("/deleteMedFromCat", deleteMedFromCat);
app.get("/getMedFromCatById/:uid/:id", getMedFromCatById);

app.post("/addMessage", addMessage);
app.get("/getAllMessages", getAllMessages);
app.get("/getMessageById/:id", getMessageById);
app.post("/deleteMessage", deleteMessage);

app.post("/addListenCat", addListenCat);
app.get("/getAllListenCats", getAllListenCats);
app.get("/getListenCatById/:id", getListenCatById);
app.post("/deleteListenCatById", deleteListenCatById);
app.get("/getbyid/:id", getbyid);

app.post("/addListenToCat", addListenToCat);
app.post("/deleteListenFromCat", deleteListenFromCat);
app.get("/getListenFromCatById/:uid/:id", getListenFromCatById);

app.post("/addpodcastCat", addpodcastCat);
app.get("/getAllpodcastCats", getAllpodcastCats);
app.get("/getpodcastCatById/:id", getpodcastCatById);
app.post("/deletepodcastCatById", deletepodcastCatById);

app.post("/addpodcastToCat", addpodcastToCat);
app.post("/deletepodcastFromCat", deletepodcastFromCat);
app.get("/getpodcastFromCatById/:uid/:id", getpodcastFromCatById);

app.post("/addyogaCat", addyogaCat);
app.get("/getAllyogaCats", getAllyogaCats);
app.get("/getyogaCatById/:id", getyogaCatById);
app.post("/deleteyogaCatById", deleteyogaCatById);

app.post("/addyogaToCat", addyogaToCat);
app.post("/deleteyogaFromCat", deleteyogaFromCat);
app.get("/getyogaFromCatById/:uid/:id", getyogaFromCatById);

app.get("/getHome", getHome);

app.post("/login", login);
app.post("/register", register);
app.post("/logout", logout);
app.post("/updateUserStats", updateUserStats);
app.get("/user", checkLogged);
app.post("/refreshToken", refreshToken);

app.get("/getinfos/:id", getinfos)


app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
