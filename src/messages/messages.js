import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "../../config_fire";

const addMessage = async (req, res) => {
  const data = {
    ...req.body,
    uid: uuid(),
    time: new Date().getTime() / 1000,
  };
  //console.log(data);
  try {
    const document = await addDoc(collection(db, "mesaje"), data);
    res.status(200).json({ ok: true, id: document.id });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
function orderByField(array, field, ascending = true) {
  return array.sort((a, b) => {
    if (a[field] < b[field]) {
      return ascending ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return ascending ? 1 : -1;
    }
    return 0;
  });
}
const getAllMessages = async (req, res) => {
  try {
    const data = [];
    const messages = await //   getDocs(
    //   collection(db, "mesaje"),
    //   orderBy("time", "asc")
    // );
    getDocs(collection(db, "mesaje"));
    messages.forEach((mes) => {
      data.push({ ...mes.data(), id: mes.id });
    });
    res.status(200).json({ data: shuffleArray(data) });
    // res.status(200).json({ data: orderByField(data, "time", false) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const id = req.body.id;
    const reff = doc(db, "mesaje", id);
    deleteDoc(reff)
      .then((r) => {
        //console.log(r);
        res.status(200).json({ ok: true });
      })
      .catch((error) => {
        res.status(500).json({ ok: false, error });
      });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const getMessageById = async (req, res) => {
  try {
    const id = req.params.id;
    const reff = doc(db, "mesaje", id);
    const message = await getDoc(reff);
    res
      .status(200)
      .json({ ok: true, data: { id: message.id, ...message.data() } });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

export { addMessage, deleteMessage, getAllMessages, getMessageById };
