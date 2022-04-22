import passport from "passport";
import express, { Application } from "express";
import { jwtStrategy } from "./src/authorization/strategies/jwt.strategy";
import { localStrategy } from "./src/authorization/strategies/local.strategy";
import { AppDataSource } from "./src/config/db/appDataSource";
import { commonErrorHandler } from "./src/error-handnling/common-error-handler";
import { adminRouter } from "./src/routes/admin.routes";
import { transactionsRouter } from "./src/routes/transactions.routes";
import { usersRouter } from "./src/routes/users.routes";
import { logger } from "./src/logger/pino-logger";

const app: Application = express();

//config
app.use(express.json());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(passport.initialize());

//set routes
app.use("/users", usersRouter);
app.use("/transactions", transactionsRouter);
app.use("/admin", adminRouter);

//common error handlers
app.use(commonErrorHandler);

//start point
const bootstrap = async () => {
  try {
    await AppDataSource.initialize().then(() =>
      logger.info("Connected to PostgreSQL successfully")
    );

    app.listen(3000, () => logger.info("Server is active"));
  } catch (err) {
    logger.error(err.message);
  }
};

bootstrap();
