import passport from "passport";

export const JwtAuthGuard = passport.authenticate("jwt", { session: false });
