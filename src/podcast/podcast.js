import { db, storage } from "../../config_fire.js";
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

const addpodcastToCat = async (req, res) => {
  const data = {
    category: req.body.category,
    background: "",
    title: req.body.title,
    isLocked: req.body.isLocked === "true",
    duration: req.body.duration,
    podcastLink: "",
  };
  const uid = req.body.uid;
  //console.log(req.files["background"]);
  try {
    const storageRef = ref(
      storage,
      `/podcast/pod/${req.files["background"].name}`
    );

    await uploadBytes(storageRef, req.files["background"].data);

    const url = await getDownloadURL(storageRef);

    const storageRef2 = ref(
      storage,
      `/podcast/pod/${req.files["podcastLink"].name}`
    );

    await uploadBytes(storageRef2, req.files["podcastLink"].data);

    const url2 = await getDownloadURL(storageRef2);

    data["podcastLink"] = url2;
    data["background"] = url;
    data["id"] = uuid();

    const cat_ref = doc(db, "categorie_podcast", uid);
    const podcastcat = await getDoc(cat_ref);
    const cat = podcastcat.data();
    cat.podcastRoutines.push(data);

    await updateDoc(cat_ref, cat);
    res.status(200).json({ ok: true });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const deletepodcastFromCat = async (req, res) => {
  try {
    const cat_ref = doc(db, "categorie_podcast", req.body.uid);
    const podcastcat = await getDoc(cat_ref);
    let cat = podcastcat.data();
    const id = req.body.id;
    cat.podcastRoutines = cat.podcastRoutines.filter((obj) => obj.id !== id);
    //console.log(cat);
    await updateDoc(cat_ref, cat);
    res.status(200).json({ ok: true });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const getpodcastFromCatById = async (req, res) => {
  try {
    //console.log(req.params.uid);
    const cat_ref = doc(db, "categorie_podcast", req.params.uid);
    const podcastcat = await getDoc(cat_ref);
    let cat = podcastcat.data();
    const id = req.params.id;
    const rez = cat.podcastRoutines.filter((obj) => obj.id === id);
    res.status(200).json({ ok: true, data: rez });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

export { addpodcastToCat, deletepodcastFromCat, getpodcastFromCatById };
