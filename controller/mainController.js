const firebase = require("../database/db");
const Maincomponent = require("../models/maincomponent");
const firestore = firebase.firestore();

const getMainComponent = async (req, res) => {
  try {
    // store last document
    let lastestDoc = req.body.lastestDocTime;

    if (!req.body.lastestDocTime) {
      lastestDoc = null;
    } else {
      lastestDoc = parseInt(req.body.lastestDocTime);
    }

    // Create Product Ref
    const productRef = await firestore
      .collection("Product")
      .orderBy("time")
      .limit(10)
      .startAfter(lastestDoc || 0);
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
          doc.data().description,
          doc.data().time
        );
        productsInfoArray.push(mainComponent);
        uidArray.push(doc.data().uid);
        //console.log(productData);
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

// const searchMainComponent = async (req, res) => {
//   try {
//     const category = req.body.category;
//     const searchProduct = firestore
//       .collection("Product")
//       .where("category", "==", category)
//       .get();

//     const productsInfoArray = [];
//     const uidArray = [];

//     if (searchProduct.exists) {
//       querySnapshot.forEach((doc) => {
//         const mainComponent = new Maincomponent(
//           doc.id,
//           doc.data().productName,
//           doc.data().mainImage,
//           doc.data().images,
//           doc.data().description
//         );
//         productsInfoArray.push(mainComponent);
//         uidArray.push(doc.data().uid);
//       });

//       // add profile data (username, pic) to maincomponent
//       for (i = 0; i < productsInfoArray.length; i++) {
//         const profileInfo = await firestore
//           .collection("Profile")
//           .doc(uidArray[i]);
//         let profileData = await profileInfo.get();
//         productsInfoArray[i].username = profileData.data().displayName;
//         productsInfoArray[i].userImage = profileData.data().userImage;
//       }
//       res.send(productsInfoArray);
//     } else {
//       res.status(404).send("Error getting documents");
//     }
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// };

module.exports = {
  getMainComponent,
  // searchMainComponen,
};
