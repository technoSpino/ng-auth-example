var logger = require('winston');

logger.info('Chill Winston, the logs are being captured on console');
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { level: 'debug', colorize: true });

module.exports = logger;