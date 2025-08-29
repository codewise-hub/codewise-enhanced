import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const step = 'start';
  
  try {
    console.log('=== TEST SIGNUP START ===');
    
    if (req.method === 'GET') {
      return res.status(200).json({
        message: 'Test signup endpoint is working',
        method: 'POST required for signup test',
        environment: {
          NODE_ENV: process.env.NODE_ENV,
          DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
          JWT_SECRET_EXISTS: !!process.env.JWT_SECRET,
        }
      });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Test body parsing
    console.log('Testing request body parsing...');
    if (!req.body) {
      return res.status(400).json({ 
        error: 'No request body',
        step: 'body_parsing'
      });
    }
    
    console.log('Request body received:', {
      email: req.body?.email,
      hasPassword: !!req.body?.password,
      name: req.body?.name,
      role: req.body?.role
    });

    // Test environment variables
    console.log('Testing environment variables...');
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({
        error: 'DATABASE_URL missing',
        step: 'environment'
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        error: 'JWT_SECRET missing', 
        step: 'environment'
      });
    }

    // Test module imports
    console.log('Testing module imports...');
    let importResults = { success: false, errors: [] as string[] };
    
    try {
      console.log('Importing database...');
      const { db } = await import('./_lib/db');
      console.log('Database imported successfully');
      
      console.log('Importing schema...');
      const { users } = await import('../shared/schema');
      console.log('Schema imported successfully');
      
      console.log('Importing auth functions...');
      const { createUser, createUserSession } = await import('./_lib/auth');
      console.log('Auth functions imported successfully');
      
      // Test database connection
      console.log('Testing database connection...');
      const testQuery = await db.select().from(users).limit(1);
      console.log(`Database test successful - found ${testQuery.length} users`);
      
      importResults.success = true;
      
    } catch (importError: any) {
      console.error('Import/DB error:', importError);
      importResults.errors.push(importError.message);
      
      return res.status(500).json({
        error: 'Module import or database connection failed',
        details: importError.message,
        step: 'imports_or_database'
      });
    }

    return res.status(200).json({
      message: 'All tests passed!',
      step: 'success',
      environment: 'verified',
      imports: 'verified',
      database: 'connected',
      ready: 'for actual signup'
    });

  } catch (error: any) {
    console.error('=== TEST SIGNUP ERROR ===');
    console.error(error);
    
    return res.status(500).json({
      error: 'Test signup failed',
      message: error.message,
      step: step,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}