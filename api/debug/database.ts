import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Test 1: Check environment variables
    console.log('=== DATABASE DEBUG START ===');
    
    const envCheck = {
      DATABASE_URL: !!process.env.DATABASE_URL,
      JWT_SECRET: !!process.env.JWT_SECRET,
      NODE_ENV: process.env.NODE_ENV || 'development'
    };
    
    console.log('Environment variables:', envCheck);
    
    // Test 2: Try to import modules
    let importResults = {
      db: false,
      users: false,
      userSessions: false,
      createUser: false,
      createUserSession: false,
      importErrors: [] as string[]
    };
    
    try {
      console.log('Testing db import...');
      const dbModule = require('../_lib/db');
      importResults.db = !!dbModule.db;
      console.log('DB module imported successfully');
      
      console.log('Testing schema import...');
      const schemaModule = require('../../shared/schema');
      importResults.users = !!schemaModule.users;
      importResults.userSessions = !!schemaModule.userSessions;
      console.log('Schema module imported successfully');
      
      console.log('Testing auth import...');
      const authModule = require('../_lib/auth');
      importResults.createUser = !!authModule.createUser;
      importResults.createUserSession = !!authModule.createUserSession;
      console.log('Auth module imported successfully');
      
      // Test 3: Try database connection
      console.log('Testing database connection...');
      const db = dbModule.db;
      const users = schemaModule.users;
      
      // Simple query to test connection
      const testQuery = await db.select().from(users).limit(1);
      console.log(`Database connection test successful - found ${testQuery.length} users`);
      
      // Test 4: Check table existence
      console.log('Checking table existence...');
      const tableCheckQuery = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('users', 'user_sessions', 'packages')
        ORDER BY table_name
      `;
      
      const { executeSQL } = require('../_lib/db');
      const tableResult = await executeSQL(tableCheckQuery);
      console.log('Tables found:', tableResult);
      
      return res.status(200).json({
        status: 'success',
        environment: envCheck,
        imports: importResults,
        database: {
          connected: true,
          userCount: testQuery.length,
          tables: tableResult
        },
        message: 'All database checks passed'
      });
      
    } catch (importError: any) {
      importResults.importErrors.push(importError.message);
      console.error('Import/DB error:', importError);
      
      return res.status(500).json({
        status: 'error',
        environment: envCheck,
        imports: importResults,
        error: {
          message: importError.message,
          stack: importError.stack
        }
      });
    }
    
  } catch (error: any) {
    console.error('=== DATABASE DEBUG ERROR ===');
    console.error(error);
    
    return res.status(500).json({
      status: 'error',
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      }
    });
  }
}