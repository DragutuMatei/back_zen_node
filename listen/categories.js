import { db, storage } from "../config_fire";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuid } from "uuid";

const addListenCat = async (req, res) => {
  const data = {
    categoryTitle: req.body.categoryTitle,
    backgroundImage: "",
    listenRoutines: [],
  };

  try {
    const storageRef = ref(
      storage,
      `/listen/cat/${req.files["backgroundImage"].name}`
    );
    // var reader = new window.FileReader();
    // reader.onload = function () {
    //   var blob = window.dataURLtoBlob(reader.result);
    // };

    // reader.readAsDataURL(req.files["backgroundImage"]);

    await uploadBytes(
      storageRef,
      req.files["backgroundImage"].data
      // reader/
    );

    const url = await getDownloadURL(storageRef);
    data["backgroundImage"] = url;
    data["id"] = uuid();
    const document = await addDoc(collection(db, "categorie_listen"), data);
    res.status(200).json({ ok: true, id: document.id });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const getAllListenCats = async (req, res) => {
  const data = [];
  try {
    const listenCats = await getDocs(collection(db, "categorie_listen"));
    listenCats.forEach((doc) => {
      data.push({ uid: doc.id, ...doc.data() });
    });
    res.status(200).json({ ok: true, data });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

const getListenCatById = async (req, res) => {
  //console.log(req.params.id);
  try {
    const ref = doc(db, "categorie_listen", req.params.id);
    const listencat = await getDoc(ref);
    res.status(200).json({
      ok: true,
      data: { uid: listencat.id, ...listencat.data() },
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const deleteListenCatById = async (req, res) => {
  try {
    //console.log(req.body);
    const ref = doc(db, "categorie_listen", req.body.id);

    deleteDoc(ref)
      .then((r) => {
        //console.log(r);
        res.status(200).json({ ok: true });
      })
      .catch((error) => {
        res.status(500).json({ ok: false, error });
      });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

export {
  addListenCat,
  getAllListenCats,
  getListenCatById,
  deleteListenCatById,
};
