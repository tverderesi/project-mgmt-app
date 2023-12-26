import winston from "winston";
import { MongoDB } from "winston-mongodb";
import { config } from "dotenv";
import DailyRotateFile from "winston-daily-rotate-file";

const envPath = process.env.NODE_ENV === "development" ? ".env.development" : ".env";

config({
  path: envPath,
});
export const logger = winston.createLogger({
  exceptionHandlers: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.timestamp(), winston.format.cli()),
      level: "verbose",
    }),
    new DailyRotateFile({
      filename: "./logs/exceptions-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.timestamp(), winston.format.cli()),
      level: "verbose",
    }),
    new DailyRotateFile({
      filename: "./logs/rejections-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
  ],
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.timestamp(), winston.format.cli()),
      level: "verbose",
    }),
    new DailyRotateFile({
      filename: "./logs/logs-%DATE%.log",
      auditFile: "./logs/audit/logs-audit.json",
      datePattern: "YYYY-MM-DD-HH",
      level: "info",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
    new DailyRotateFile({
      filename: "./logs/errors-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      level: "error",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      auditFile: "./logs/audit/error-audit.json",
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),

    new MongoDB({
      options: { useUnifiedTopology: true },
      format: winston.format.combine(winston.format.errors(), winston.format.json()),
      db: `${process.env.MONGO_URI}`,
      collection: "logs",
      storeHost: true,
      level: "info",
    }),
  ],
});
