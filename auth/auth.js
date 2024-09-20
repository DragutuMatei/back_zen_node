import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, auth_admin, db } from "../config_fire";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const register = async (req, res) => {
  const { email, password, platform } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      email: "Email is required",
      password: "Password is required",
    });
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      sendEmailVerification(auth.currentUser)
        .then(async () => {
          await addDoc(collection(db, "users"), {
            email: email,
            time: new Date().getTime() / 1000,
            med_time: 0,
            resp_time: 0,
            carduri_alese: 0,
            abonament: "",
            platform: platform,
            lasts: {},
            imgUrl: "",
          });

          res.status(201).json({
            message: "Verification email sent! User created successfully!",
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Error sending email verification" });
        });
    })
    .catch((error) => {
      const errorMessage =
        error.message || "An error occurred while registering user";
      res.status(500).json({ error: errorMessage });
    });
};

const login = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(422).json({
      email: "Email is required",
      password: "Password is required",
    });
  }
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const idToken = userCredential._tokenResponse.idToken;
      //console.log(idToken);
      if (idToken) {
        res.cookie("accessToken", idToken, {
          httpOnly: true,
        });
        res.status(200).json({
          accessToken: idToken,
        });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    })
    .catch((error) => {
      console.error(error);
      const errorMessage =
        error.message || "An error occurred while logging in";
      res.status(500).json({ error: errorMessage });
    });
};

const checkLogged = async (req, res) => {
  // const user = auth.currentUser;
  // let ok = false;
  // if (user) ok = true;
  // res.status(200).json({ user });
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const token = authHeader.split("Bearer ")[1]; // Extract the token

  try {
    // Verify the token using Firebase Admin SDK
    const decodedToken = await auth_admin.verifyIdToken(token);
    const userId = decodedToken.uid; // Get the user ID from the decoded token
    console.log(userId);
    const email = decodedToken["email"];
    const user_ref = collection(db, "users");
    const q = query(user_ref, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    // Fetch user data from Firestore collection 'users'
    // const userDoc = await db.collection('users').doc(userId).get();

    // if (!userDoc.exists) {
    //   return res.status(404).send({ error: 'User not found' });
    // }

    // const userData = userDoc.data();

    // Return the user's data
    res.status(200).send({
      userId: userId,
      decodedToken: decodedToken["email"],
      data: { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() },
      // userData: userData,
    });
  } catch (error) {
    console.error("Error verifying token or fetching user data:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const logout = async (res, req) => {
  signOut(auth)
    .then(() => {
      res.clearCookie("accessToken");
      res.status(200).json({ message: "User logged out successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
function decodeBase64ToBuffer(base64String) {
  // Remove the Base64 metadata if present (e.g., "data:image/png;base64,")
  const base64Data = base64String.replace(/^data:.+;base64,/, '');

  // Convert Base64 string to a buffer
  const fileBuffer = Buffer.from(base64Data, 'base64');

  return fileBuffer; // Return the buffer
}
const updateUserStats = async (req, res) => {
  console.log(req.body);
  const { key, value, id } = req.body;
  try {
    const user_ref = doc(db, "users", id);
    let user = await getDoc(user_ref);
    user = user.data();
    if (key === "lasts") {
      user[key].push(value);
    } else if (
      key === "med_time" ||
      key === "carduri_alese" ||
      key === "resp_time"
    ) {
      user[key] += Number(value);
    } else if (key === "abonament") {
      user[key] = value;
    } else if (key === "imgUrl") {
      try {
        const file = decodeBase64ToBuffer(req.files[key])
        console.log(file)
        const storageRef = ref(storage, `/users/${file.name}`);

        await uploadBytes(storageRef, file.data);

        const url = await getDownloadURL(storageRef);
        user["imgUrl"] = url;
        await updateDoc(user_ref, user);

        res.status(200).json({ ok: true });
      } catch (error) {
        //console.log(error);
        res.status(500).json({ ok: false, error });
      }
    }
    await updateDoc(user_ref, user);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: "plm" });
  }
};

export { login, logout, register, updateUserStats, checkLogged };
