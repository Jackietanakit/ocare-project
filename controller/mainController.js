const db = require("../database/db");
const Maincomponent = require("../models/maincomponent");
const firestore = db.firestore();

const getMainComponent = async (req, res, next) => {
  try {
    const productInfo = await firestore.collection("Prodoct");
    const productData = await productInfo.get();

    const productsInfoArray = [];
    const userToken = [];

    if (productData.empty) {
      res.status(404).send("No product record");
    } else {
      productData.forEach((doc) => {
        const mainComponent = new Maincomponent(
          doc.data().productName,
          doc.data().mainImage,
          doc.data().smallImage,
          doc.data().description
        );
        productsInfoArray.push(mainComponent);
        userToken.push(doc.data().userToken);
      });

      // add profile data (username, pic) to maincomponent
      for (i = 0; i < productsInfoArray.length; i++) {
        const profileInfo = await firestore
          .collection("Profile")
          .doc(userToken[i]);
        let profileData = await profileInfo.get();
        productsInfoArray[i].username = profileData.data().username;
        productsInfoArray[i].pic = profileData.data().pic;
      }
      res.send(productsInfoArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getMainComponent,
};
