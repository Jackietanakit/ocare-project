class Maincomponent {
  constructor(
    productId,
    productName,
    mainImage,
    images,
    description,
    time,
    category,
    displayName,
    imageUser
  ) {
    this.productId = productId;
    this.productName = productName;
    this.mainImage = mainImage;
    this.images = images;
    this.description = description;
    this.time = time;
    this.category = category;
    this.displayName = displayName;
    this.imageUser = imageUser;
  }
}

module.exports = Maincomponent;
