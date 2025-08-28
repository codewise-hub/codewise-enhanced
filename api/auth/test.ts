import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Basic connectivity test
    const testData = {
      method: req.method,
      headers: {
        'user-agent': req.headers['user-agent'],
        'content-type': req.headers['content-type'],
      },
      body: req.body,
      cookies: req.cookies,
      environment: {
        databaseUrl: !!process.env.DATABASE_URL,
        jwtSecret: !!process.env.JWT_SECRET,
        nodeEnv: process.env.NODE_ENV,
      },
      timestamp: new Date().toISOString()
    };

    console.log('Auth test endpoint hit:', testData);

    res.status(200).json({
      status: 'success',
      message: 'Auth test endpoint is working',
      data: testData
    });
  } catch (error: any) {
    console.error('Auth test error:', error);
    res.status(500).json({
      status: 'error',
      error: error.message,
      message: 'Auth test failed'
    });
  }
}