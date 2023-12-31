import passport from "passport";
import local from "./localStrategy";
import User from "../models/user";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: number, done) => {
    User.findOne({ where: { id } })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  });

  local();
};
