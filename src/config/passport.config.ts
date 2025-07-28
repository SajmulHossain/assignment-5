import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../modules/user/user.model";
import { compare } from "bcryptjs";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const isUserExist = await User.findOne({ email });

        if (!isUserExist) {
          return done("User doesn't exist");
        }

        const isPasswordMatched = await compare(password, isUserExist.password);

        if (!isPasswordMatched) {
          return done(null, false, { message: "Password didn't matched" });
        }

        return done(null, isUserExist);
      } catch (error) {
        return done(error);
      }
    }
  )
);
