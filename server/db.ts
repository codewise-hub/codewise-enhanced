import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema";

// Configure websocket for serverless
neonConfig.webSocketConstructor = ws;

// Environment variable validation with detailed error messages
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is missing');
  console.error('Please set DATABASE_URL in your environment or .env file');
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Log database connection attempt (without exposing credentials)
const dbUrl = process.env.DATABASE_URL;
const maskedUrl = dbUrl.replace(/:\/\/([^:]+):([^@]+)@/, '://***:***@');
console.log(`Attempting to connect to database: ${maskedUrl}`);

try {
  export const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    // Add connection timeout and retry options for better error handling
    connectionTimeoutMillis: 10000, // 10 second timeout
    idleTimeoutMillis: 30000, // 30 second idle timeout
  });
  
  export const db = drizzle({ client: pool, schema });
  
  console.log('Database connection pool created successfully');
} catch (error) {
  console.error('Failed to create database connection pool:', error);
  throw error;
}
