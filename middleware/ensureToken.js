const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const ensureToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;

      JWT.verify(req.token, "Wingadian", (err, data) => {
        if (err) {
          res.status(403).send("Unauthorize");
        } else {
          const uid = decryptedUid(data.userUid);
          req.uid = uid;
          next();
        }
      });
    } else {
      res.status(404).send(error.message);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const decryptedUid = (userUid) => {
  try {
    const input = userUid.toString();
    const key = "74979910710510138801081111213880";
    const iv = "3511511611111012";

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(input, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    //console.log(decrypted);
    return decrypted;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  ensureToken,
  decryptedUid,
};
