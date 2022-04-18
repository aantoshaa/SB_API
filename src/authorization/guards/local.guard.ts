import passport from "passport";

export const LocalAuthGuard = passport.authenticate("local", {
  session: false,
});
