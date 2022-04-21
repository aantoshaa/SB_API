import express, { Application, NextFunction, Request, Response } from "express";
import passport from "passport";
import { jwtStrategy } from "./src/authorization/strategies/jwt.strategy";
import { localStrategy } from "./src/authorization/strategies/local.strategy";
import { AppDataSource } from "./src/config/db/appDataSource";
import { CommonException } from "./src/error-handnling/exceptions";
import { transactionsRouter } from "./src/routes/transactions.routes";
import { usersRouter } from "./src/routes/users.routes";

const app: Application = express();

//config
app.use(express.json());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(passport.initialize());

//set routes
app.use("/users", usersRouter);
app.use("/transactions", transactionsRouter);

//common error handlers
app.use(
  (err: CommonException, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).send({
      message: "Ooops... Something went wrong",
      reason: err.message,
    });
  }
);

//start point
const bootstrap = async () => {
  try {
    await AppDataSource.initialize().then(() =>
      console.log("Connected to PostgreSQL successfully")
    );

    app.listen(3000, () => console.log("Server is active"));
  } catch (err) {
    console.log(err.message);
  }
};

bootstrap();
