import { Strategy as LocalStrategy } from "passport-local";
import { UnauthorizaedException } from "../../error-handnling/exceptions";
import { UserRepostirory } from "../../repositories/user.repository";
import { localStrategyOptions } from "./options/local.options";

export const localStrategy = new LocalStrategy(
  localStrategyOptions,
  async (email, password, done) => {
    try {
      const user = await UserRepostirory.findOne({
        where: {
          credentials: {
            email,
          },
        },
        relations: {
          credentials: true,
          // roles: true,
        },
      });

      console.log(user);

      if (user && user.credentials.password === password) {
        const { id } = user;
        return done(null, { id }); // req.user = { id: 123 }
      } else throw new UnauthorizaedException();
    } catch (err) {
      done(err, false);
    }
  }
);
