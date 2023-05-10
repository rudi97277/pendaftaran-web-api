import mongoose from "mongoose";
import { UserSchema } from "../models/crmModel";

const jwt = require("jsonwebtoken");
const User = mongoose.model("User", UserSchema);

const auth = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET,
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Unauthenticated" });
        } else {
          User.findOne({
            _id: decode.id,
          })
            .then((user) => {
              req.userId = user._id;
              next();
            })
            .catch((err) => {
              res.status(500).send({
                message: err,
              });
            });
        }
      }
    );
  } else {
    res.status(401).send({ message: "Unauthenticated" });
  }
};

export default auth;
