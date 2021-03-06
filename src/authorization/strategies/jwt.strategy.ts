import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { UnauthorizaedException } from "../../error-handnling/authorization-exceptions";
import { UserRepostirory } from "../../repositories/user.repository";

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: process.env.TOKEN_KEY_WORD,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    try {
      const { sub, roles } = payload;
      const user = await UserRepostirory.findOne({ where: { id: sub } });

      if (!user) throw new UnauthorizaedException();

      done(null, { id: sub, roles }); // req.user = { id: 456 }
    } catch (err) {
      done(err, false);
    }
  }
);
