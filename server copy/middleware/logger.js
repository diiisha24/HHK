// middleware/logger.js
import logger from '../config/logger.js';


const requestLogger = (req, res, next) => {
    const startTime = Date.now();
    const method = req.method;
    const url = req.url;
    const ip = req.ip;
    const query = JSON.stringify(req.query);
    const body = ['GET', 'DELETE'].includes(method) ? '' : JSON.stringify(req.body);
    const userAgent = req.get('User-Agent');

    res.on('finish', () => {
        const statusCode = res.statusCode;
        const duration = Date.now() - startTime;
        const logMessage = `${method} ${url} - IP: ${ip} - Status: ${statusCode} - Duration: ${duration}ms - Query: ${query}${body ? ` - Body: ${body}` : ''} - UA: ${userAgent}`;

        logger.info(logMessage); // Use Winston to log the message
    });

    next();
};

export default requestLogger;