/* eslint-disable @typescript-eslint/no-explicit-any */
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
          return done(null, false, { message: "User doesn't exist" });
        }

        const isPasswordMatched = await compare(password, isUserExist.password as string);

        if (!isPasswordMatched) {
          return done(null, false, { message: "Password didn't matched" });
        }

        return done(null, isUserExist.toObject());
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});


passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});