import { db, storage } from "../../config_fire.js";
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
import { check } from "../auth/auth.js";

const addyogaCat = async (req, res) => {
  const data = {
    categoryTitle: req.body.categoryTitle,
    backgroundImage: "",
    yogaRoutines: [],
  };
  //console.log(req.files["backgroundImage"]);

  try {
    const storageRef = ref(
      storage,
      `/yoga/cat/${req.files["backgroundImage"].name}`
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
    const document = await addDoc(collection(db, "categorie_yoga"), data);
    res.status(200).json({ ok: true, id: document.id });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const getAllyogaCats = async (req, res) => {
  const data = [];
  let abonament = "";
  let user = null;
  if (
    req.headers.authorization != undefined &&
    req.headers.authorization.startsWith("Bearer ") != undefined
  ) {
    try {
      const [decodedToken, userId, userObj] = await check(req);
      console.log("decodedToken:", userId, userObj);
      abonament = userObj.abonament;
      user = userObj;
    } catch (error) {
      abonament = "";
    }
  } else {
    abonament = ""; // user anonim
  }
  try {
    const yogaCats = await getDocs(collection(db, "categorie_yoga"));
    yogaCats.forEach((doc) => {
      data.push({ uid: doc.id, ...doc.data() });
    });
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].yogaRoutines.length; j++) {
        data[i].yogaRoutines[j].isLocked = false;
      }
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

const getyogaCatById = async (req, res) => {
  //console.log(req.params.id);
  try {
    const ref = doc(db, "categorie_yoga", req.params.id);
    const yogacat = await getDoc(ref);
    res.status(200).json({
      ok: true,
      data: { uid: yogacat.id, ...yogacat.data() },
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const deleteyogaCatById = async (req, res) => {
  try {
    //console.log(req.body);
    const ref = doc(db, "categorie_yoga", req.body.id);

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

export { addyogaCat, getAllyogaCats, getyogaCatById, deleteyogaCatById };
