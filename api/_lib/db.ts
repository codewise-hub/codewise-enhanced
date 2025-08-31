import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { sql } from 'drizzle-orm';
import ws from "ws";
import * as schema from "../../shared/schema";

// Configure websocket for serverless
neonConfig.webSocketConstructor = ws;

// Environment variable validation with detailed error messages
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is missing in API context');
  console.error('Please set DATABASE_URL in your Vercel environment variables');
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Log database connection attempt (without exposing credentials)
const dbUrl = process.env.DATABASE_URL;
const maskedUrl = dbUrl.replace(/:\/\/([^:]+):([^@]+)@/, '://***:***@');
console.log(`API: Attempting to connect to database: ${maskedUrl}`);

// Create pool and database connection
let pool: Pool;
let db: ReturnType<typeof drizzle>;

try {
  pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    // Add connection timeout and retry options for better error handling
    connectionTimeoutMillis: 10000, // 10 second timeout
    idleTimeoutMillis: 30000, // 30 second idle timeout
  });
  
  db = drizzle({ client: pool, schema });
  
  console.log('API: Database connection pool created successfully');
} catch (error) {
  console.error('API: Failed to create database connection pool:', error);
  throw error;
}

// Helper function for raw SQL execution (FIXED - removed spread operator)
export async function executeSQL(query: string) {
  try {
    console.log('Executing SQL:', query.substring(0, 100) + (query.length > 100 ? '...' : ''));
    // FIXED: Remove spread operator that was causing TypeScript error
    const result = await db.execute(sql.raw(query));
    console.log('SQL execution successful');
    return result;
  } catch (error) {
    console.error('SQL execution failed:', error);
    throw error;
  }
}

export { pool, db, sql };
