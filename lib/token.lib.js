var jwt = require("jsonwebtoken");

class _token {
  // generate new jwt token
  generateToken(data) {
    let token = jwt.sign(
      {
        data,
      },
      process.env.PRIVATE_KEY,
      { expiresIn: "7d" }
    );

    return token;
  }

  // verify token

  // get data from token
}

const tokenLib = new _token();
module.exports = tokenLib;
