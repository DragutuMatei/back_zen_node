import { db, storage } from "../../config_fire";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
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

const addMedToCat = async (req, res) => {
  const data = {
    time: new Date().getTime() / 1000,
    category: req.body.category,
    background: "",
    title: req.body.title,
    isLocked: req.body.isLocked === "true",
    duration: req.body.duration,
    meditationLink: "",
    tags: JSON.parse(req.body.tags),
  };

  console.log(req.body.tags);
  const uid = req.body.uid;
  //console.log(req.files["background"]);
  try {
    const storageRef = ref(
      storage,
      `/meditations/med/${req.files["background"].name}`
    );

    await uploadBytes(storageRef, req.files["background"].data);

    const url = await getDownloadURL(storageRef);

    const storageRef2 = ref(
      storage,
      `/meditations/med/${req.files["meditationLink"].name}`
    );

    await uploadBytes(storageRef2, req.files["meditationLink"].data);

    const url2 = await getDownloadURL(storageRef2);

    data["meditationLink"] = url2;
    data["background"] = url;
    data["id"] = uuid();

    const cat_ref = doc(db, "categorie_meditati", uid);
    const medcat = await getDoc(cat_ref);
    const cat = medcat.data();
    cat.meditationRoutines.push(data);

    await updateDoc(cat_ref, cat);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const deleteMedFromCat = async (req, res) => {
  try {
    console.log(req.body);
    const cat_ref = doc(db, "categorie_meditati", req.body.uid);
    const medcat = await getDoc(cat_ref);
    let cat = medcat.data();
    const id = req.body.id;
    cat.meditationRoutines = cat.meditationRoutines.filter(
      (obj) => obj.id !== id
    );
    // cat.meditationRoutines.push(data);
    //console.log(cat);
    await updateDoc(cat_ref, cat);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const getMedFromCatById = async (req, res) => {
  try {
    //console.log(req.params.uid);
    const cat_ref = doc(db, "categorie_meditati", req.params.uid);
    const medcat = await getDoc(cat_ref);
    let cat = medcat.data();
    const id = req.params.id;
    const rez = cat.meditationRoutines.filter((obj) => obj.id === id);
    res.status(200).json({ ok: true, data: rez });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

export { addMedToCat, deleteMedFromCat, getMedFromCatById };
