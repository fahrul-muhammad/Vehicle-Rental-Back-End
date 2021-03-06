const val = {};
const { is } = require("express/lib/request");
const jwt = require("jsonwebtoken");
const res = require("../helpers/response");
const auth = require("../models/auth");

val.signUp = (req, res, next) => {
  const { body } = req;
  const signUpBody = ["name", "email", "password"];
  const bodyProperty = Object.keys(body);
  const isBodyValid = signUpBody.filter((property) => !bodyProperty.includes(property)).length == 0 ? true : false;
  if (!isBodyValid)
    return res.status(500).json({
      pesan: "invalid body",
    });
  next();
};

val.signIn = (req, res, next) => {
  const { body } = req;
  const signInBody = ["email", "password"];
  const bodyProperty = Object.keys(body);
  const isBodyValid = signInBody.filter((property) => !bodyProperty.includes(property)).length == 0 ? true : false;
  if (!isBodyValid)
    return res.status(500).json({
      pesan: "harus mengisi email dan password",
    });
  next();
};

// val.validateToken = (token) => {
//   return (req, res, next) => {
//     jwt.verify(token, process.env.JWT_KEYS, (err, payload) => {
//       req.userInfo = payload;
//       if (err) res.status(400).json({ pesan: "token tidak valid" });
//     });
//     next();
//   };
// };

val.ValidateRole = (roles = []) => {
  return (req, res, next) => {
    // const result = await auth.checkToken();
    // console.log(result);
    const { token } = req.headers;
    console.log("USER TOKEN", token);
    let isAuth = false;
    if (token.length == 0)
      return res.status(401).json({
        pesan: "harus memiliki token untuk mengakses endpoint ini",
      });
    jwt.verify(token, process.env.JWT_KEYS, (err, payload) => {
      if (err !== null) {
        if (err.name === "TokenExpiredError") {
          return res.status(403).json({
            pesan: "sesi telah habis,silahkan Log-In kembali",
          });
        }
      }
      roles.map((val) => {
        if (val == payload.role) {
          isAuth = true;
        }
      });
      req.userInfo = payload;
    });
    if (isAuth) {
      // val.Token(req, res, next);
      next();
    } else {
      return res.status(403).json({
        pesan: "access denied",
      });
    }
  };
};

val.Token = async (req, res, next) => {
  try {
    const tokens = req.headers.token;
    const result = await auth.checkToken(tokens);
    if (result.length > 0) {
      return res.status(403).json({
        pesan: "You already Log out,Log in again to enter this endpoint",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("ADA ERROR", error);
  }
};

module.exports = val;
