const db = require("../database/db");

var storageRef = db.storage().ref();

const uploadProduct = async (images, uid, body) => {
  const imagesUrl = [];

  for (const i in images) {
    console.log(i);
    if (images[i]) {
      const image = images[i];
      const fileName = `${uid}/${body.productName}/${Date.now()}`;
      const arrayUrl = await uploadImage(image, fileName);
      imagesUrl.push(arrayUrl);
    } else {
      imagesUrl.push(null);
    }
  }

  return imagesUrl;
};

const uploadProfile = async (image, uid) => {
  const fileName = `${uid}/profileImage/${Date.now()}`;
  return await uploadImage(image, fileName);
};

const uploadImage = async (image, fileName) => {
  const productRef = storageRef.child(fileName);
  await productRef.put(image.buffer, {
    contentType: image.mimetype,
  });
  console.log("Uploaded " + image.originalname);
  return await productRef.getDownloadURL();
};

module.exports = { uploadProduct, uploadProfile };
