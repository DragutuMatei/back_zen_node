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
import { check } from "../auth/auth";

const addMedCat = async (req, res) => {
  const data = {
    categoryTitle: req.body.categoryTitle,
    backgroundImage: "",
    meditationRoutines: [],
  };
  //console.log(req.files["backgroundImage"]);

  try {
    const storageRef = ref(
      storage,
      `/meditations/cat/${req.files["backgroundImage"].name}`
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
    const document = await addDoc(collection(db, "categorie_meditati"), data);
    res.status(200).json({ ok: true, id: document.id });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const getAllMedCats = async (req, res) => {
  const data = [];
  let abonament = "";
  try {
    const [decodedToken, userId, user] = await check(req);
    abonament = user.abonament;
  } catch (error) {
    abonament = false;
  }
  try {
    const medCats = await getDocs(collection(db, "categorie_meditati"));
    medCats.forEach((doc) => {
      data.push({ uid: doc.id, ...doc.data() });
    });

    if (abonament != false && abonament != "") {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].meditationRoutines.length; j++) {
          data[i].meditationRoutines[j].isLocked = false;
        }
      }
    }
    //console.log(abonament);
    // console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

const getMedCatById = async (req, res) => {
  //console.log(req.params.id);
  try {
    const ref = doc(db, "categorie_meditati", req.params.id);
    const medcat = await getDoc(ref);
    res.status(200).json({
      ok: true,
      data: { uid: medcat.id, ...medcat.data() },
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const deleteMedCatById = async (req, res) => {
  try {
    //console.log(req.body);
    const ref = doc(db, "categorie_meditati", req.body.id);

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

export { addMedCat, getAllMedCats, getMedCatById, deleteMedCatById };

// id categorie si tag
// => sa nu aiba id categorie

// => [
// {nume categorie, meditationroutines:[toate cu tagul respectiv]},
// {nume categorie, meditationroutines:[toate cu tagul respectiv]}  
// ]
// 
// 
// 