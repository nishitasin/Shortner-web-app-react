import axios from 'axios';

// Type definitions for the logging middleware
type LogStack = 'backend' | 'frontend';
type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type LogPackageFrontend = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'auth' | 'config' | 'middleware' | 'utils';

const LOG_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/logs`;

/**
 * Logs events to the evaluation service.
 * @param stack The system part where the log originated ('frontend' or 'backend').
 * @param level The severity of the log ('info', 'warn', 'error', etc.).
 * @param pkg The package or module where the log occurred.
 * @param message A descriptive log message.
 */
export const Log = async (
  stack: LogStack,
  level: LogLevel,
  pkg: LogPackageFrontend,
  message: string
) => {
  try {
    const logData = {
      stack,
      level,
      package: pkg,
      message,
    };
    await axios.post(LOG_API_URL, logData);
  } catch (err) {
    // Log failures to the console but do not throw to avoid crashing the app
    console.error('Failed to send log to server:', err);
  }
};
