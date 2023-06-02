import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info', // Set the desired log level
  format: winston.format.combine(
    winston.format.timestamp(), // Include timestamp in the log entry
    winston.format.json() // Use JSON format for log entries
  ),
  transports:
    process.env.NODE_ENV === 'production'
      ? new winston.transports.File({ filename: 'logs/server.log' })
      : new winston.transports.Console(),
});
