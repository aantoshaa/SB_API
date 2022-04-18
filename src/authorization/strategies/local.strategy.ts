import { Strategy as LocalStrategy } from "passport-local";
import { UserRepostirory } from "../../repositories/user.repository";

export const localStrategy = new LocalStrategy(
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
        },
      });

      if (user && user.credentials.password === password) {
        const { id } = user;
        return done(null, { id }); // req.user = { id: 123 }
      } else throw new Error("Unauthorizad in LocalStrategy");
    } catch (err) {
      done(err, false);
    }
  }
);
