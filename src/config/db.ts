import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_PORT",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  max: 20, // Maximum pool size for production
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Error handling for pool
pool.on("error", (error) => {
  console.error("Unexpected error on idle client", error);
});

// Test the connection on startup
pool
  .connect()
  .then((client) => {
    console.log("Database connection successful");
    client.release();
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });