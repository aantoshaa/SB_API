import { IStrategyOptions as LocalStrategyOptions } from "passport-local";

export const localStrategyOptions: LocalStrategyOptions = {
  usernameField: "email",
  // session: false,
};
