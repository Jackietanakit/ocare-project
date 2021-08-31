const firebase = require("../database/db");
const firestore = firebase.firestore();
require("firebase/auth");
const {
  encryptedUid,
  generateId,
  generateToken,
  getUserUid,
} = require("../helper/authHelper");

const signUpApi = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    await firebase.auth().createUserWithEmailAndPassword(email, password);
    // Signed in
    const uid = getUserUid();

    // encryptedUid for security
    const userUid = encryptedUid();
    console.log(userUid);

    // generate JWT token
    const userToken = await generateToken(userUid);

    // add user to database
    const userId = generateId();
    const userData = {
      email: email,
      userId: userId,
      userToken: userToken,
      userUid: userUid,
    };

    await firestore.collection("Profile").doc(uid).set(userData);
    res.status(200).json({
      userId: userId,
      userToken: userToken,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const loginApi = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        res.status(400).send("Wrong password");
      });
    const user = firebase.auth().currentUser;
    const uid = user.uid;

    const profileRef = await firestore.collection("Profile").doc(uid);
    const profileData = await profileRef.get();

    const userToken = profileData.data().userToken;
    const userId = profileData.data().userId;

    res.status(200).json({
      userId: userId,
      userToken: userToken,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const logoutApi = async (req, res) => {
  try {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        res.status(200).send("log-out successful");
      })
      .catch((error) => {
        res.status(404).send("Failed to logout" + error.message);
      });
  } catch (error) {
    res.status(404).send("Failed to logout" + error.message);
  }
};

const checkUser = (req, res, next) => {
  try {
    if (!firebase.auth().currentUser) {
      res.send("No user");
    } else {
      res.send(firebase.auth().currentUser);
    }
  } catch {
    res.send(error.message);
  }
};

const forgetPassword = async (req, res) => {
  console.log(req.body);
  // try {
  await firebase.auth().sendPasswordResetEmail(req.body.email);

  res.status(200).send("Password reset email sent!");
  // } catch {
  //   res.status(404).send("Email not found");
  // }
};

module.exports = {
  signUpApi,
  loginApi,
  logoutApi,
  checkUser,
  forgetPassword,
};
