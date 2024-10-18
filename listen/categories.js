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
  let abonament = "";
  try {
    const [decodedToken, userId, user] = await check(req);
    abonament = user.abonament;
  } catch (error) {
    abonament = false;
  }
  try {
    const listenCats = await getDocs(collection(db, "categorie_listen"));
    listenCats.forEach((doc) => {
      data.push({ uid: doc.id, ...doc.data() });
    });
    if (abonament != false && abonament != "") {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].listenRoutines.length; j++) {
          data[i].listenRoutines[j].isLocked = false;
        }
      }
    }
    //console.log(abonament);
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

const getbyid = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  let final;
  const data = [];
  let abonament = "";
  try {
    const [decodedToken, userId, user] = await check(req);
    abonament = user.abonament;
  } catch (error) {
    abonament = false;
  }
  try {
    const medCats = await getDocs(collection(db, "categorie_listen"));
    medCats.forEach((doc) => {
      data.push({ uid: doc.id, ...doc.data() });
    });

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].listenRoutines.length; j++) {
        // if (data[i].listenRoutines.length > 0)
        if (data[i].listenRoutines[j].id == id) {
          if (abonament != false && abonament != "") {
            data[i].listenRoutines[j].isLocked = false;
          }
          final = data[i].listenRoutines[j];
          break;
        } else {
          data[i].listenRoutines.splice(j, 1);
          j--;
        }
      }
    }
    //console.log(abonament);
    // console.log(data);
    console.log(final);
    res.status(200).json({ data: { ...final } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error });
  }
};
export {
  addListenCat,
  getAllListenCats,
  getListenCatById,
  deleteListenCatById,
  getbyid,
};
