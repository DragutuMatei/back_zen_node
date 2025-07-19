// import { db, storage } from "../../config_fire.js";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDoc,
//   getDocs,
//   orderBy,
//   query,
//   where,
// } from "firebase/firestore";
// import {
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
//   uploadBytes,
// } from "firebase/storage";
// import { v4 as uuid } from "uuid";
// import { check } from "../auth/auth.js";

// function orderByField(array, field, ascending = true) {
//   return array.sort((a, b) => {
//     if (a[field] < b[field]) {
//       return ascending ? -1 : 1;
//     }
//     if (a[field] > b[field]) {
//       return ascending ? 1 : -1;
//     }
//     return 0;
//   });
// }
// const addListenCat = async (req, res) => {
//   const data = {
//     categoryTitle: req.body.categoryTitle,
//     backgroundImage: "",
//     order: req.body.order,
//     listenRoutines: [],
//   };

//   try {
//     const storageRef = ref(
//       storage,
//       `/listen/cat/${req.files["backgroundImage"].name}`
//     );
//     // var reader = new window.FileReader();
//     // reader.onload = function () {
//     //   var blob = window.dataURLtoBlob(reader.result);
//     // };

//     // reader.readAsDataURL(req.files["backgroundImage"]);

//     await uploadBytes(
//       storageRef,
//       req.files["backgroundImage"].data
//       // reader/
//     );

//     const url = await getDownloadURL(storageRef);
//     data["backgroundImage"] = url;
//     data["id"] = uuid();
//     const document = await addDoc(collection(db, "categorie_listen"), data);
//     res.status(200).json({ ok: true, id: document.id });
//   } catch (error) {
//     //console.log(error);
//     res.status(500).json({ ok: false, error });
//   }
// };

// const getAllListenCats = async (req, res) => {
//   let data = [];
//   let abonament = "";
//   try {
//     const [decodedToken, userId, user] = await check(req);
//     abonament = user.abonament;
//   } catch (error) {
//     abonament = false;
//   }
//   try {
//     const listenCats = await getDocs(
//       collection(db, "categorie_listen"),
//       orderBy("order", "desc")
//     );
//     listenCats.forEach((doc) => {
//       data.push({ uid: doc.id, ...doc.data() });
//     });

//     data = orderByField(data, "order", false);
//     console.log(abonament);

//     if (abonament != false && abonament != "") {
//       for (let i = 0; i < data.length; i++) {
//         for (let j = 0; j < data[i].listenRoutines.length; j++) {
//           data[i].listenRoutines[j].isLocked = false;
//         }
//       }
//     }
//     for (let i = 0; i < data.length; i++) {
//       data[i].listenRoutines = orderByField(
//         data[i].listenRoutines,
//         "time",
//         true
//       );
//       console.log(data[i].listenRoutines);
//     }
//     res.status(200).json({ ok: true, data });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ ok: false, error });
//   }
// };

// const getListenCatById = async (req, res) => {
//   const result = await getListenCatByIdRaw(req.params.id);
//   if (result.ok) {
//     res.status(200).json(result);
//   } else {
//     res.status(500).json(result);
//   }
// };

// const getListenCatByIdRaw = async (id) => {
//   try {
//     const ref = doc(db, "categorie_listen", id);
//     const listencat = await getDoc(ref);
//     return { ok: true, data: { uid: listencat.id, ...listencat.data() } };
//   } catch (error) {
//     return { ok: false, error };
//   }
// };

// const deleteListenCatById = async (req, res) => {
//   try {
//     //console.log(req.body);
//     const ref = doc(db, "categorie_listen", req.body.id);

//     deleteDoc(ref)
//       .then((r) => {
//         //console.log(r);
//         res.status(200).json({ ok: true });
//       })
//       .catch((error) => {
//         res.status(500).json({ ok: false, error });
//       });
//   } catch (error) {
//     res.status(500).json({ ok: false, error });
//   }
// };

// const getbyid = async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   let final;
//   const data = [];
//   let abonament = "";
//   try {
//     const [decodedToken, userId, user] = await check(req);
//     abonament = user.abonament;
//   } catch (error) {
//     abonament = false;
//   }
//   try {
//     const medCats = await getDocs(collection(db, "categorie_listen"));
//     medCats.forEach((doc) => {
//       data.push({ uid: doc.id, ...doc.data() });
//     });

//     for (let i = 0; i < data.length; i++) {
//       for (let j = 0; j < data[i].listenRoutines.length; j++) {
//         // if (data[i].listenRoutines.length > 0)
//         if (data[i].listenRoutines[j].id == id) {
//           if (abonament != false && abonament != "") {
//             data[i].listenRoutines[j].isLocked = false;
//           }
//           final = data[i].listenRoutines[j];
//           break;
//         } else {
//           data[i].listenRoutines.splice(j, 1);
//           j--;
//         }
//       }
//     }
//     //console.log(abonament);
//     // console.log(data);
//     console.log(final);
//     res.status(200).json({ data: { ...final } });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ ok: false, error });
//   }
// };
// export {
//   addListenCat,
//   getAllListenCats,
//   getListenCatById,
//   deleteListenCatById,
//   getbyid,
//   getListenCatByIdRaw,
//   orderByField,
// };
import { db, storage } from "../../config_fire.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
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
const addListenCat = async (req, res) => {
  const data = {
    categoryTitle: req.body.categoryTitle,
    backgroundImage: "",
    order: req.body.order,
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
  let data = [];
  let abonament = "";
  let user = null;
  try {
    const [decodedToken, userId, userObj] = await check(req);
    abonament = userObj.abonament;
    user = userObj;
  } catch (error) {
    abonament = ""; // user anonim
  }
  try {
    const listenCats = await getDocs(
      collection(db, "categorie_listen"),
      orderBy("order", "desc")
    );
    listenCats.forEach((doc) => {
      data.push({ uid: doc.id, ...doc.data() });
    });
    data = orderByField(data, "order", false);
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].listenRoutines.length; j++) {
        data[i].listenRoutines[j].isLocked = abonament
          ? false
          : data[i].listenRoutines[j].isLocked;
      }
    }
    for (let i = 0; i < data.length; i++) {
      data[i].listenRoutines = orderByField(
        data[i].listenRoutines,
        "time",
        true
      );
    }
    res.status(200).json({ ok: true, data });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

const getListenCatById = async (req, res) => {
  const result = await getListenCatByIdRaw(req.params.id);
  if (result.ok) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};

const getListenCatByIdRaw = async (id) => {
  try {
    const ref = doc(db, "categorie_listen", id);
    const listencat = await getDoc(ref);
    return { ok: true, data: { uid: listencat.id, ...listencat.data() } };
  } catch (error) {
    return { ok: false, error };
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
  let final;
  const data = [];
  let abonament = "";
  try {
    const [decodedToken, userId, userObj] = await check(req);
    abonament = userObj.abonament;
    if (!abonament || abonament === "") {
      return res.status(403).json({ error: "Premium required" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const medCats = await getDocs(collection(db, "categorie_listen"));
    medCats.forEach((doc) => {
      data.push({ uid: doc.id, ...doc.data() });
    });
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].listenRoutines.length; j++) {
        if (data[i].listenRoutines[j].id == id) {
          data[i].listenRoutines[j].isLocked = false;
          final = data[i].listenRoutines[j];
          break;
        } else {
          data[i].listenRoutines.splice(j, 1);
          j--;
        }
      }
    }
    res.status(200).json({ data: { ...final } });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};
export {
  addListenCat,
  getAllListenCats,
  getListenCatById,
  deleteListenCatById,
  getbyid,
  getListenCatByIdRaw,
  orderByField,
};
