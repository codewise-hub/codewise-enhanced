import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { signInUser } from '../_lib/auth';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check required environment variables
    if (!process.env.DATABASE_URL) {
      console.error('Missing DATABASE_URL environment variable');
      return res.status(500).json({ error: 'Server configuration error - missing database URL' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('Missing JWT_SECRET environment variable');
      return res.status(500).json({ error: 'Server configuration error - missing JWT secret' });
    }

    // Validate input data
    const { email, password } = signInSchema.parse(req.body);
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    console.log(`Signin attempt for email: ${email}`);
    
    const result = await signInUser(
      email, 
      password,
      req.headers['user-agent'],
      req.headers['x-forwarded-for'] as string || req.connection?.remoteAddress
    );

    if (!result) {
      console.log(`Signin failed for email: ${email} - Invalid credentials`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const { user, sessionToken } = result;
    console.log(`Signin successful for user: ${user.id}`);

    // Set session cookie
    res.setHeader('Set-Cookie', [
      `sessionToken=${sessionToken}; Max-Age=604800; Path=/; HttpOnly; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    ]);

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        ageGroup: user.ageGroup,
        packageId: user.packageId,
        subscriptionStatus: user.subscriptionStatus,
        isActive: user.isActive,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      sessionToken
    });
  } catch (error: any) {
    console.error('Signin error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Invalid input data', 
        details: error.errors 
      });
    }
    
    // Check for database connection errors
    if (error.message?.includes('connect') || error.message?.includes('database')) {
      return res.status(500).json({ 
        error: 'Database connection error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}