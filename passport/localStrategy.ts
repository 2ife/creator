import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import User from "../models/user";

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
        passReqToCallback: false,
      },
      async (id, password, done) => {
        try {
          const exUser = await User.findOne({ where: { loginId: id } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "loginError" });
            }
          } else {
            done(null, false, { message: "loginError" });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
