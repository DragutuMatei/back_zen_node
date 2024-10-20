import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, auth_admin, db, storage } from "../config_fire";
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
  if (!email || !password) {
    return res.status(422).json({
      email: "Email is required",
      password: "Password is required",
    });
  }
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const idToken = userCredential._tokenResponse.idToken;

      if (idToken) {
        res.cookie("accessToken", idToken, {
          httpOnly: true,
        });
        res.status(200).json({
          accessToken: idToken,
          refreshToken: userCredential._tokenResponse.refreshToken,
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
async function check(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const token = authHeader.split("Bearer ")[1]; // Extract the token

  try {
    // Verify the token using Firebase Admin SDK
    var decodedToken = await auth_admin.verifyIdToken(token);
    var userId = decodedToken.uid; // Get the user ID from the decoded token
    const email = decodedToken["email"];
    const user_ref = collection(db, "users");
    const q = query(user_ref, where("email", "==", email));
    var querySnapshot = await getDocs(q);
    return [
      decodedToken,
      userId,
      { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() },
    ];
  } catch (error) {
    // console.error("data:", error);
    return false;
    // res.status(500).send({ error: "Internal Server Error" });
  }
}
const checkLogged = async (req, res) => {
  // const user = auth.currentUser;
  // let ok = false;
  // if (user) ok = true;
  // res.status(200).json({ user });
  try {
    const [decodedToken, userId, data] = await check(req);
    console.log ({
      userId: userId,
      decodedToken: decodedToken["email"],
      data: { ...data },
    });
    res.status(200).send({
      userId: userId,
      decodedToken: decodedToken["email"],
      data: { ...data },
    });
  } catch (error) {
    res.status(200).send({});
  }
};

const logout = async (req, res) => {
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
function getBase64ImageExtension(base64Image) {
  // Ensure base64 image is not empty
  if (!base64Image) {
    return null;
  }

  // Decode the first few characters of the base64 string
  const byteString = atob(base64Image.slice(0, 30)); // Decode the first 30 characters
  const magicNumbers = byteString
    .substr(0, 4)
    .split("")
    .map((c) => c.charCodeAt(0)); // Get the first 4 byte values

  // Check for magic numbers to determine the image format
  if (magicNumbers[0] === 0xff && magicNumbers[1] === 0xd8) {
    return "jpg"; // JPEG
  } else if (magicNumbers[0] === 0x89 && magicNumbers[1] === 0x50) {
    return "png"; // PNG
  } else if (magicNumbers[0] === 0x47 && magicNumbers[1] === 0x49) {
    return "gif"; // GIF
  } else if (magicNumbers[0] === 0x52 && magicNumbers[1] === 0x49) {
    return "tiff"; // TIFF
  } else if (magicNumbers[0] === 0x42 && magicNumbers[1] === 0x4d) {
    return "bmp"; // BMP
  } else if (
    magicNumbers[0] === 0x52 &&
    magicNumbers[1] === 0x49 &&
    magicNumbers[2] === 0x46 &&
    magicNumbers[3] === 0x38
  ) {
    return "webp"; // WEBP
  }

  return null; // Return null if format is unrecognized
}

const updateUserStats = async (req, res) => {
  const { key, value, id } = req.body;
  console.log(key);
  try {
    const user_ref = doc(db, "users", id);
    let user = await getDoc(user_ref);
    user = user.data();
    if (key === "med_time" || key === "carduri_alese" || key === "resp_time") {
      user[key] += Number(value);
      // value reprezinta minutele ascultate / cardurile alese
    } else if (key === "abonament") {
      user[key] = value;
    } else if (key === "imgUrl") {
      try {
        const byteString = atob(value);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([uint8Array], {
          type: `image/${getBase64ImageExtension(value)}`,
        });
        const storageRef = ref(
          storage,
          `/users/${id}-${user.email}.${getBase64ImageExtension(value)}`
        );

        await uploadBytes(storageRef, blob);

        const url = await getDownloadURL(storageRef);
        user["imgUrl"] = url;
      } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, error: "pula mea coaie" });
      }
    } else if (key === "lasts") {
      console.log("pullllllllllllllllllllllllaaaaaaaaaaaa");
      user[key].unshift(value);
      const length = 3;
      if (user[key].length > length) {
        user[key].length = length;
      }
      console.log(user[key]);
    await updateDoc(user_ref, {lasts: user[key]});
  }
    await updateDoc(user_ref, user);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: "plm" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const response = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=${process.env.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: req.body.refreshToken, // Pass the refresh token here
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to refresh ID token");
    }

    const data = await response.json();

    const newIdToken = data.id_token; // New ID token
    const newRefreshToken = data.refresh_token; // Updated refresh token (save it)
    const expiresIn = data.expires_in; // Expiry time in seconds
    res
      .status(200)
      .json({ accessToken: newIdToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Error refreshing ID token:", error);
    res.status(500).json({ ok: false });
  }
};

export {
  check,
  login,
  logout,
  register,
  updateUserStats,
  checkLogged,
  refreshToken,
};
