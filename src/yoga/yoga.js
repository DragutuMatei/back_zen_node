import { db, storage } from "../../config_fire";
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

const addyogaToCat = async (req, res) => {
  const data = {
    category: req.body.category,
    background: "",
    title: req.body.title,
    isLocked: req.body.isLocked === "true",
    duration: req.body.duration,
    yogaLink: "",
  };
  const uid = req.body.uid;
  //console.log(req.files["background"]);
  try {
    const storageRef = ref(
      storage,
      `/yoga/yog/${req.files["background"].name}`
    );

    await uploadBytes(storageRef, req.files["background"].data);

    const url = await getDownloadURL(storageRef);

    const storageRef2 = ref(storage, `/yoga/yog/${req.files["yogaLink"].name}`);

    await uploadBytes(storageRef2, req.files["yogaLink"].data);

    const url2 = await getDownloadURL(storageRef2);

    data["yogaLink"] = url2;
    data["background"] = url;
    data["id"] = uuid();

    const cat_ref = doc(db, "categorie_yoga", uid);
    const yogacat = await getDoc(cat_ref);
    const cat = yogacat.data();
    cat.yogaRoutines.push(data);

    await updateDoc(cat_ref, cat);
    res.status(200).json({ ok: true });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const deleteyogaFromCat = async (req, res) => {
  try {
    const cat_ref = doc(db, "categorie_yoga", req.body.uid);
    const yogacat = await getDoc(cat_ref);
    let cat = yogacat.data();
    const id = req.body.id;
    cat.yogaRoutines = cat.yogaRoutines.filter((obj) => obj.id !== id);
    //console.log(cat);
    await updateDoc(cat_ref, cat);
    res.status(200).json({ ok: true });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const getyogaFromCatById = async (req, res) => {
  try {
    //console.log(req.params.uid);
    const cat_ref = doc(db, "categorie_yoga", req.params.uid);
    const yogacat = await getDoc(cat_ref);
    let cat = yogacat.data();
    const id = req.params.id;
    const rez = cat.yogaRoutines.filter((obj) => obj.id === id);
    res.status(200).json({ ok: true, data: rez });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

export { addyogaToCat, deleteyogaFromCat, getyogaFromCatById };
