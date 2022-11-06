const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

//middleware to check for secret_token and decrypt it
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (err) {
        done(err);
      }
    }
  )
);

//signup middleware
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const user = await User.create({
          email,
          password,
          last_name,
          first_name,
        });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

//login middleware
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          const error = new Error("User not found");
          error.custom = true;
          error.code = 400;
          return done(error);
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          const error = new Error("Wrong Password");
          error.custom = true;
          error.code = 400;
          return done(error);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
