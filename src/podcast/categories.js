import { db, storage } from "../../config_fire";
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

const addpodcastCat = async (req, res) => {
  const data = {
    categoryTitle: req.body.categoryTitle,
    backgroundImage: "",
    podcastRoutines: [],
  };
  //console.log(req.files["backgroundImage"]);

  try {
    const storageRef = ref(
      storage,
      `/podcast/cat/${req.files["backgroundImage"].name}`
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
    const document = await addDoc(collection(db, "categorie_podcast"), data);
    res.status(200).json({ ok: true, id: document.id });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const getAllpodcastCats = async (req, res) => {
  const data = [];
  let abonament = "";
  try {
    const [decodedToken, userId, user] = await check(req);
    abonament = user.abonament;
  } catch (error) {
    abonament = false;
  }
  try {
    const podcastCats = await getDocs(collection(db, "categorie_podcast"));
    podcastCats.forEach((doc) => {
      data.push({ uid: doc.id, ...doc.data() });
    });
    if (abonament != false && abonament != "") {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].podcastRoutines.length; j++) {
          data[i].podcastRoutines[j].isLocked = false;
        }
      }
    }
    //console.log(abonament);

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

const getpodcastCatById = async (req, res) => {
  //console.log(req.params.id);
  try {
    const ref = doc(db, "categorie_podcast", req.params.id);
    const podcastcat = await getDoc(ref);
    res.status(200).json({
      ok: true,
      data: { uid: podcastcat.id, ...podcastcat.data() },
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const deletepodcastCatById = async (req, res) => {
  try {
    //console.log(req.body);
    const ref = doc(db, "categorie_podcast", req.body.id);

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
  addpodcastCat,
  getAllpodcastCats,
  getpodcastCatById,
  deletepodcastCatById,
};
