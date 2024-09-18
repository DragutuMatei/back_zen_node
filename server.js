import express, { json } from "express";
import cors from "cors";
import {
  addMedCat,
  getAllMedCats,
  getMedCatById,
  deleteMedCatById,
} from "./meditations/categories";
import fileUpload from "express-fileupload";
import {
  addMedToCat,
  deleteMedFromCat,
  getMedFromCatById,
} from "./meditations/meditations";
import {
  addMessage,
  deleteMessage,
  getAllMessages,
  getMessageById,
} from "./messages/messages";
import {
  checkLogged,
  login,
  logout,
  register,
  updateUserStats,
} from "./auth/auth";
import {
  addListenCat,
  deleteListenCatById,
  getAllListenCats,
  getListenCatById,
} from "./listen/categories";
import {
  addListenToCat,
  deleteListenFromCat,
  getListenFromCatById,
} from "./listen/listen";
import {
  addpodcastCat,
  deletepodcastCatById,
  getAllpodcastCats,
  getpodcastCatById,
} from "./podcast/categories";
import {
  addpodcastToCat,
  deletepodcastFromCat,
  getpodcastFromCatById,
} from "./podcast/podcast";
import {
  addyogaCat,
  deleteyogaCatById,
  getAllyogaCats,
  getyogaCatById,
} from "./yoga/categories";
import {
  addyogaToCat,
  deleteyogaFromCat,
  getyogaFromCatById,
} from "./yoga/yoga";
import { getHome } from "./utils/home";
const app = express();

app.use(fileUpload());
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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

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
// async (req, res) => {
//   (req, res);
//   res.json({ status: true, message: "Our node.js app works" });
// });

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
