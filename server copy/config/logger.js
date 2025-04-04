// // config/logger.js
// import winston from 'winston';

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(
//     winston.format.colorize(),
//     winston.format.timestamp(),
//     winston.format.printf(({ timestamp, level, message }) => {
//       return `${timestamp} ${level}: ${message}`;
//     })
//   ),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'logs/app.log' })
//   ],
// });

// export default logger;

// config/logger.js
import winston from 'winston';
import 'winston-daily-rotate-file'; // For log rotation

// Define transports
const transports = [
  // Console transport
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
      })
    ),
  }),
  // File transport for all logs with rotation
  new winston.transports.DailyRotateFile({
    filename: 'logs/app-%DATE%.log', // Pattern for log file names
    datePattern: 'YYYY-MM-DD', // Rotate daily
    maxSize: '20m', // Max size per file: 20MB
    maxFiles: '14d', // Keep logs for 14 days
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
      })
    ),
  }),
  // File transport for error logs only
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error', // Only log errors
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
      })
    ),
  }),
];

// Create the logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports,
});

export default logger;