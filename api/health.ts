import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Basic health check with deployment info
    const healthInfo = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      method: req.method,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
        JWT_SECRET_EXISTS: !!process.env.JWT_SECRET,
      },
      deployment: {
        region: process.env.VERCEL_REGION || 'unknown',
        commit: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
      },
      endpoints: {
        signup: '/api/auth/signup',
        signup_simple: '/api/auth/signup-simple',
        debug_database: '/api/debug/database',
        debug_setup_schema: '/api/debug/setup-schema'
      },
      message: 'Codewise Enhanced API is running'
    };

    // Test if we can load core modules
    try {
      const { db } = require('./_lib/db');
      healthInfo.modules = {
        db: !!db,
        database_connection: 'available'
      };
    } catch (error: any) {
      healthInfo.modules = {
        db: false,
        database_connection: 'failed',
        error: error.message
      };
    }

    res.status(200).json(healthInfo);
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}