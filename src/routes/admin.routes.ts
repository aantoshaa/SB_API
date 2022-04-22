import { Router } from "express";
import { RolesGuard } from "../authorization/guards/roles.guard";
import { AdminController } from "../controllers/admin.controller";

export const adminRouter = Router();

adminRouter.use(RolesGuard);

adminRouter.route("/users/:id").get(AdminController.getUserById);
adminRouter.route("/users").get(AdminController.getAllUsers);
adminRouter.route("/delete/:id").delete(AdminController.deleteOne);
adminRouter.route("/transactions").get(AdminController.getAllTransactions);
