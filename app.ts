import express, { Application, NextFunction, Request, Response } from "express";
import passport from "passport";
import { jwtStrategy } from "./src/authorization/strategies/jwt.strategy";
import { localStrategy } from "./src/authorization/strategies/local.strategy";
import { AppDataSource } from "./src/config/db/appDataSource";
import { usersRouter } from "./src/routes/users.routes";

const app: Application = express();

//config
app.use(express.json());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(passport.initialize());
//set routes
app.use("/users", usersRouter);

//common error handlers
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.send({
    message: "Ooops... Something went wrong",
    reason: err.message,
  });
});

//start point
const bootstrap = async () => {
  await AppDataSource.initialize().then(() =>
    console.log("Connected to PostgreSQL successfully")
  );

  app.listen(3000, () => console.log("Server is active"));
};

bootstrap();
