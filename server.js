import express, { json } from "express";
import cors from "cors";
import {
  addMedCat,
  getAllMedCats,
  getMedCatById,
  deleteMedCatById,
  getOthers,
  getOthers2,
} from "./src/meditations/categories";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import {
  addMedToCat,
  deleteMedFromCat,
  getMedFromCatById,
} from "./src/meditations/meditations";
import {
  addMessage,
  deleteMessage,
  getAllMessages,
  getMessageById,
} from "./src/messages/messages";
import {
  checkLogged,
  login,
  logout,
  register,
  updateUserStats,
  refreshToken,
} from "./src/auth/auth";
import {
  addListenCat,
  deleteListenCatById,
  getAllListenCats,
  getbyid,
  getListenCatById,
} from "./src/listen/categories";
import {
  addListenToCat,
  deleteListenFromCat,
  getListenFromCatById,
} from "./src/listen/listen";
import {
  addpodcastCat,
  deletepodcastCatById,
  getAllpodcastCats,
  getpodcastCatById,
} from "./src/podcast/categories";
import {
  addpodcastToCat,
  deletepodcastFromCat,
  getpodcastFromCatById,
} from "./src/podcast/podcast";
import {
  addyogaCat,
  deleteyogaCatById,
  getAllyogaCats,
  getyogaCatById,
} from "./src/yoga/categories";
import {
  addyogaToCat,
  deleteyogaFromCat,
  getyogaFromCatById,
} from "./src/yoga/yoga";

import { getHome } from "./src/utils/home";

const app = express();

app.use(fileUpload());
app.use(bodyParser.json({ limit: "1000mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "1000mb",
    extended: true,
    parameterLimit: 500000,
  })
);
app.use(bodyParser.text({ limit: "1000mb" }));

app.use(json());
// app.use(
//   cors({
//     origin: "*",
//     // origin: "http://localhost:3000",
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//     // credentials: true,
//   })
// );

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

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
