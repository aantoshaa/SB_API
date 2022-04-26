import { Request, Response, Router } from "express";
import passport from "passport";
import { AuthController } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.route("/").get(AuthController.SuggestGoogleAuth);

authRouter.route("/google").get(
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
  })
);

authRouter
  .route("/google/callback")
  .get(
    passport.authenticate("google", { session: false }),
    (req: Request, res: Response) => {
      res.send(`Hello, ${JSON.stringify(req.user)}`);
    }
  );
