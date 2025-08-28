import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Test 1: Environment variables
    const dbUrl = process.env.DATABASE_URL;
    const jwtSecret = process.env.JWT_SECRET;
    
    if (!dbUrl) {
      return res.status(500).json({
        error: 'Missing DATABASE_URL',
        step: 'environment_check'
      });
    }
    
    if (!jwtSecret) {
      return res.status(500).json({
        error: 'Missing JWT_SECRET', 
        step: 'environment_check'
      });
    }
    
    // Test 2: Try to import database connection
    console.log('Testing database import...');
    
    let db;
    try {
      const dbModule = await import('./_lib/db');
      db = dbModule.db;
      console.log('Database import successful');
    } catch (importError: any) {
      console.error('Database import failed:', importError);
      return res.status(500).json({
        error: 'Database import failed',
        details: importError.message,
        step: 'database_import'
      });
    }
    
    // Test 3: Try simple database connection
    console.log('Testing database connection...');
    try {
      // Import schema
      const schemaModule = await import('../shared/schema');
      const { users } = schemaModule;
      
      // Simple query
      const result = await db.select().from(users).limit(1);
      console.log('Database query successful, rows:', result.length);
      
      return res.status(200).json({
        status: 'success',
        message: 'All database tests passed',
        tests: {
          environment_variables: true,
          database_import: true, 
          database_connection: true,
          query_result: `Found ${result.length} users`
        }
      });
      
    } catch (dbError: any) {
      console.error('Database connection failed:', dbError);
      return res.status(500).json({
        error: 'Database connection failed',
        details: dbError.message,
        step: 'database_connection',
        code: dbError.code
      });
    }
    
  } catch (error: any) {
    console.error('Test endpoint error:', error);
    return res.status(500).json({
      error: 'Unexpected error',
      details: error.message,
      stack: error.stack,
      step: 'unexpected_error'
    });
  }
}