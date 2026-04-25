/**
 * Simple logger utility for production-grade logging
 */

type LogLevel = "info" | "warn" | "error" | "debug";

const LogColors = {
  reset: "\x1b[0m",
  info: "\x1b[36m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
  debug: "\x1b[35m",
};

class Logger {
  private isDevelopment = process.env.NODE_ENV !== "production";

  private format(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const levelStr = level.toUpperCase().padEnd(5);
    const color = LogColors[level];
    const reset = LogColors.reset;

    if (this.isDevelopment) {
      let output = `${color}[${timestamp}] [${levelStr}]${reset} ${message}`;
      if (data) {
        output += `\n${JSON.stringify(data, null, 2)}`;
      }
      return output;
    }

    return JSON.stringify({
      timestamp,
      level,
      message,
      ...(data && { data }),
    });
  }

  info(message: string, data?: any): void {
    console.log(this.format("info", message, data));
  }

  warn(message: string, data?: any): void {
    console.warn(this.format("warn", message, data));
  }

  error(message: string, data?: any): void {
    console.error(this.format("error", message, data));
  }

  debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      console.log(this.format("debug", message, data));
    }
  }
}

export const logger = new Logger();
