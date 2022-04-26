import { Request, Response } from "express";

export class AuthController {
  static async SuggestGoogleAuth(req: Request, res: Response) {
    res.send(`<a href="/auth/google">Authenticate with Google</a>`);
  }
}
