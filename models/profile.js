class Profile {
  constructor(
    email,
    userId,
    userToken,
    displayName,
    firstName,
    lastName,
    tel,
    imageUser
  ) {
    // uid ()
    this.email = email;
    this.userId = userId;
    this.userToken = userToken;
    this.displayName = displayName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.tel = tel;
    this.imageUser = imageUser;
  }
}

module.exports = Profile;
