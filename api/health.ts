import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Check environment variables
    const checks = {
      databaseUrl: !!process.env.DATABASE_URL,
      jwtSecret: !!process.env.JWT_SECRET,
      nodeEnv: process.env.NODE_ENV || 'unknown',
      method: req.method,
      timestamp: new Date().toISOString()
    };

    console.log('Health check results:', checks);

    res.status(200).json({
      status: 'healthy',
      checks,
      message: 'API is working correctly'
    });
  } catch (error: any) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      error: error.message,
      message: 'API health check failed'
    });
  }
}