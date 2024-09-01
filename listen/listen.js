import { db, storage } from "../config_fire";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuid } from "uuid";

const addListenToCat = async (req, res) => {
  const data = {
    category: req.body.category,
    background: "",
    title: req.body.title,
    isLocked: req.body.isLocked === "true",
    duration: req.body.duration,
    listenLink: "",
  };
  const uid = req.body.uid;
  //console.log(req.files["background"]);
  try {
    const storageRef = ref(
      storage,
      `/listen/lis/${req.files["background"].name}`
    );

    await uploadBytes(storageRef, req.files["background"].data);

    const url = await getDownloadURL(storageRef);

    const storageRef2 = ref(
      storage,
      `/listen/lis/${req.files["listenLink"].name}`
    );

    await uploadBytes(storageRef2, req.files["listenLink"].data);

    const url2 = await getDownloadURL(storageRef2);

    data["listenLink"] = url2;
    data["background"] = url;
    data["id"] = uuid();

    const cat_ref = doc(db, "categorie_listen", uid);
    const listencat = await getDoc(cat_ref);
    const cat = listencat.data();
    cat.listenRoutines.push(data);

    await updateDoc(cat_ref, cat);
    res.status(200).json({ ok: true });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const deleteListenFromCat = async (req, res) => {
  try {
    const cat_ref = doc(db, "categorie_listen", req.body.uid);
    const listencat = await getDoc(cat_ref);
    let cat = listencat.data();
    const id = req.body.id;
    cat.listenRoutines = cat.listenRoutines.filter((obj) => obj.id !== id);
    //console.log(cat);
    await updateDoc(cat_ref, cat);
    res.status(200).json({ ok: true });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const getListenFromCatById = async (req, res) => {
  try {
    //console.log(req.params.uid);
    const cat_ref = doc(db, "categorie_listen", req.params.uid);
    const listencat = await getDoc(cat_ref);
    let cat = listencat.data();
    const id = req.params.id;
    const rez = cat.listenRoutines.filter((obj) => obj.id === id);
    res.status(200).json({ ok: true, data: rez });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

export { addListenToCat, deleteListenFromCat, getListenFromCatById };
