import { createLogger, format as _format, transports as _transports } from 'winston';

const logger = createLogger({
    level: 'info',
    format: _format.combine(
        _format.colorize(),
        _format.timestamp(),
        _format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new _transports.Console(),
        new _transports.File({ filename: 'combined.log' }),
    ],
});

export default logger;
