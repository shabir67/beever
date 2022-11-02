const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((email) => {
    if (email) {
      res.status(400).send({
        message: "Failed! Already registered pals",
      });
      return;
    }
  });
  next();
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;
