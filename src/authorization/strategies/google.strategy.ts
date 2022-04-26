import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth2";
import { User } from "../../entities/user.entity";
import { UserModel } from "../../mongoose/models/user.model";

export const googleStrategy = new GoogleStrategy(
  {
    clientID:
      "871657939645-f7hcd8f9hfndgteim9sn4hve4pqso9jf.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) => {
    const { email, provider } = profile;

    const checkedUser = await UserModel.findOne({ email });

    if (!checkedUser) {
      const user = new UserModel({ email, provider });
      await user.save();
      return done(null, { id: user.id });
    }

    return done(null, { id: checkedUser.id });
  }
);
