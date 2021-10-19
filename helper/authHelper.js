const firebase = require("../database/db");
const firestore = firebase.firestore();
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
require("firebase/auth");

const getUserUid = () => {
  try {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      const uid = user.uid;
      return uid;
    } else {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const encryptedUid = () => {
  try {
    let userUid = getUserUid();
    const input = userUid.toString();
    const key = "74979910710510138801081111213880";
    const iv = "3511511611111012";

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(input, "utf-8", "hex");
    encrypted += cipher.final("hex");
    //console.log(encrypted);
    return encrypted;
  } catch (error) {
    console.log(error.message);
  }
};

const generateId = () => {
  try {
    let input = encryptedUid();
    let userId = "";
    for (let i = 0; i < input.length; i++) {
      userId += input[i].charCodeAt(0);
    }
    userId = userId.substring(0, 7);
    return userId;
  } catch (error) {
    console.log(error.message);
  }
};

const generateToken = async (userUid) => {
  try {
    data = { userUid: userUid };
    const token = await JWT.sign(data, "Wingadian");
    console.log("Token:" + token);
    return token;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getUserUid,
  encryptedUid,
  generateId,
  generateToken,
};
