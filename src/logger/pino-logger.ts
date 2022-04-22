import PinoLogger from "pino";
export const logger = PinoLogger({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});
