const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { extractErrorResponse } = require("../src/utils/helpers");

const authRouter = express.Router();

authRouter.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    delete req.user.password;
    delete req.user.password;

    res.json({
      message: "Signup Succesful",
      user: req.user,
    });
  },
  async (error, req, res, next) => {
    if (error.name === "ValidationError") {
      return res.status(422).json(extractErrorResponse(error));
    }

    console.error(error);

    res.status(500).json({
      message: "An error occurred.",
    });
  }
);

authRouter.post(
  "/login",
  passport.authenticate("login", { session: false }),
  async (req, res, next) => {
    const body = { _id: req.user._id, email: req.user.email };

    const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  },
  async (error, req, res, next) => {
    return res.status(error.custom ? error.code : 500).json({
      message: error.custom ? error.message : "something went wrong",
    });
  }
);

module.exports = authRouter;
