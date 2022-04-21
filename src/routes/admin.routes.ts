import { Router } from "express";

const adminRouter = Router();

adminRouter.route("/users/:id").get();
adminRouter.route("/users").get();
adminRouter.route("/delete/:id").delete();
adminRouter.route("/transactions").get();
