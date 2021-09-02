class Profile {
  constructor(
    email,
    userId,
    userToken,
    userUid,
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
    this.userUid = userUid;
    this.displayName = displayName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.tel = tel;
    this.imageUser = imageUser;
  }
}

module.exports = Profile;
