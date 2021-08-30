const firebase = require("../database/db");
const firestore = firebase.firestore();

const getNextProduct = async () => {
  // store last document
  const lastestDoc = null;
  const ref = await firestore
    .collection("Product")
    .orderBy("Date")
    .limit(3)
    .startAfter();
  const data = await ref.get();

  data.doc.forEach((doc) => {
    const product = doc.data();
  });
};
