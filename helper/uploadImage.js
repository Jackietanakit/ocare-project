const db = require("../database/db");

var storageRef = db.storage().ref();

const uploadProduct = async (images, uid, body) => {
  const imagesUrl = [];

  for (i = 0; i < images.length; i++) {
    let image = images[i];
    const fileName = `${uid}/${body.productName}/${image.originalname}`;
    const arrayUrl = await uploadImage(image, fileName);
    imagesUrl.push(arrayUrl);
  }

  return imagesUrl;
};

const uploadProfile = async (image, uid) => {
  const fileName = `${uid}/profileImage/${image.originalname}`;
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
