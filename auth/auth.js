import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config_fire";
import { addDoc, collection } from "firebase/firestore";

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
            lasts: [],
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
        res.cookie("access_token", idToken, {
          httpOnly: true,
        });
        res
          .status(200)
          .json({ message: "User logged in successfully", userCredential });
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
  const user = auth.currentUser;
  let ok = false;
  if (user) ok = true;
  res.status(200).json({ user });
};

const logout = async (res, req) => {
  signOut(auth)
    .then(() => {
      res.clearCookie("access_token");
      res.status(200).json({ message: "User logged out successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const updateUserStats = async (res, req) => {
  const { key, value, id } = req.body;
  try {
    const user_ref = doc(db, "users", id);
    const user = await getDoc(user_ref);
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
    }
    await updateDoc(user_ref, user);
    res.status(200).json({ ok: true });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

export { login, logout, register, updateUserStats, checkLogged };
