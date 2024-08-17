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
import { addMessage, deleteMessage, getAllMessages, getMessageById } from "./messages/messages";
const app = express();

app.use(fileUpload());
app.use(json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.post("/addMedCat", addMedCat);
app.get("/getAllMedCats", getAllMedCats);
app.get("/getMedCatById/:id", getMedCatById);
app.post("/deleteMedCatById", deleteMedCatById);

app.post("/addMedToCat", addMedToCat);
app.post("/deleteMedFromCat", deleteMedFromCat);
app.get("/getMedFromCatById/:uid/:id", getMedFromCatById);

app.post("/addMessage", addMessage);
app.get("/getAllMessages", getAllMessages)
app.get("/getMessageById/:id", getMessageById)
app.post("/deleteMessage", deleteMessage)

// async (req, res) => {
//   (req, res);
//   res.json({ status: true, message: "Our node.js app works" });
// });

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
