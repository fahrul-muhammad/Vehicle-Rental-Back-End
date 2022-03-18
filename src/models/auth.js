const database = require("../config/database");
const auth = {};

auth.SignUp = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO users SET ?`;
    database.query(sqlQuery, [body], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

auth.signIn = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM users WHERE email = ?`;
    database.query(sqlQuery, [email], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) resolve(false);
      resolve(result[0]);
    });
  });
};

auth.insertPin = (pin, email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE users SET users.pin = ? WHERE users.email = ? `;
    database.query(sqlQuery, [pin, email], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve(result);
    });
  });
};

auth.resetPassword = (pin) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE users SET password = "" WHERE users.pin = ?`;
    database.query(sqlQuery, [pin], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

auth.updateNewPassword = (password, pin) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `
        UPDATE users
        SET users.password =  ?
        WHERE users.pin = ?`;
    database.query(sqlQuery, [password, pin], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = auth;
