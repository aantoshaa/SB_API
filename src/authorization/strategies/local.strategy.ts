import { Strategy as LocalStrategy } from "passport-local";
import { UnauthorizaedException } from "../../error-handnling/authorization-exceptions";
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
          roles: true,
        },
      });

      if (user && user.credentials.password === password) {
        const roles = user.roles.map((item) => item.role);

        const { id } = user;

        return done(null, { id, roles });
      } else throw new UnauthorizaedException();
    } catch (err) {
      done(err, false);
    }
  }
);
