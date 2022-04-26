import passport from "passport";
import express, { Application } from "express";
import { AppDataSource } from "./src/config/db/appDataSource";
import { connect } from "mongoose";
import { jwtStrategy } from "./src/authorization/strategies/jwt.strategy";
import { localStrategy } from "./src/authorization/strategies/local.strategy";
import { commonErrorHandler } from "./src/error-handnling/common-error-handler";
import { adminRouter } from "./src/routes/admin.routes";
import { transactionsRouter } from "./src/routes/transactions.routes";
import { usersRouter } from "./src/routes/users.routes";
import { logger } from "./src/logger/pino-logger";
import { googleStrategy } from "./src/authorization/strategies/google.strategy";
import { authRouter } from "./src/routes/auth.routes";

const app: Application = express();

//config
app.use(express.json());
passport.use(localStrategy);
passport.use(jwtStrategy);
passport.use(googleStrategy);
app.use(passport.initialize());

//set routes
app.use("/users", usersRouter);
app.use("/transactions", transactionsRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

//common error handlers
app.use(commonErrorHandler);

//start point
const bootstrap = async () => {
  try {
    await Promise.all([
      AppDataSource.initialize().then(() =>
        logger.info("Connected to PostgreSQL successfully")
      ),
      connect(process.env.MONGO_CONNECTION_STRING).then(() =>
        logger.info("Connected to MongoDB successfully")
      ),
    ]);

    app.listen(3000, () => logger.info("Server is active"));
  } catch (err) {
    logger.error(err.message);
  }
};

bootstrap();
