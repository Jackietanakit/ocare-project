const firebase = require("../database/db");
const Maincomponent = require("../models/maincomponent");
const firestore = firebase.firestore();

const getMainComponent = async (req, res, next) => {
  try {
    // Create Product Ref
    const productRef = await firestore.collection("Product");
    const productData = await productRef.get();

    const productsInfoArray = [];
    const uidArray = [];

    if (productData.empty) {
      res.status(404).send("No product record");
    } else {
      productData.forEach((doc) => {
        const mainComponent = new Maincomponent(
          doc.id,
          doc.data().productName,
          doc.data().mainImage,
          doc.data().images,
          doc.data().description
        );
        productsInfoArray.push(mainComponent);
        uidArray.push(doc.data().uid);
      });

      // add profile data (username, pic) to maincomponent
      for (i = 0; i < productsInfoArray.length; i++) {
        const profileInfo = await firestore
          .collection("Profile")
          .doc(uidArray[i]);
        let profileData = await profileInfo.get();
        productsInfoArray[i].username = profileData.data().displayName;
        productsInfoArray[i].userImage = profileData.data().userImage;
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
