class Maincomponent {
  constructor(
    productId,
    productName,
    mainImage,
    images,
    description,
    time,
    displayName,
    userImage
  ) {
    this.productId = productId;
    this.productName = productName;
    this.mainImage = mainImage;
    this.images = images;
    this.description = description;
    this.time = time;
    this.displayName = displayName;
    this.userImage = userImage;
  }
}

module.exports = Maincomponent;
