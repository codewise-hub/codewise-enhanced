import { VercelRequest, VercelResponse } from '@vercel/node';

// Simple API status endpoint
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Simple API status response
    const apiStatus = {
      status: 'healthy',
      message: 'Codewise Enhanced API is running',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV || 'unknown',
        hasDatabase: !!process.env.DATABASE_URL,
        hasJwtSecret: !!process.env.JWT_SECRET
      },
      endpoints: [
        '/api/auth/signin',
        '/api/auth/signup', 
        '/api/auth/signout',
        '/api/auth/me',
        '/api/packages',
        '/api/admin/users',
        '/api/import-courses'
      ]
    };
    
    console.log('Main API endpoint called:', {
      method: req.method,
      url: req.url,
      userAgent: req.headers['user-agent']
    });
    
    return res.status(200).json(apiStatus);
  } catch (error: any) {
    console.error('Main API error:', error);
    return res.status(500).json({
      error: 'API error',
      message: error.message
    });
  }
}