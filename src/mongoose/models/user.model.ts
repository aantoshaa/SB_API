import { Schema, model } from "mongoose";
import { P } from "pino";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },

  provider: {
    type: String,
  },
});

export const UserModel = model("User", userSchema);
