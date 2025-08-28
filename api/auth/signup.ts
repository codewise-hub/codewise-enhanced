import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '../_lib/db';
import { users } from '../../shared/schema';
import { createUser, createUserSession } from '../_lib/auth';

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  role: z.enum(['teacher', 'parent', 'student', 'school_admin']),
  ageGroup: z.string().optional(),
  childName: z.string().optional(),
  schoolName: z.string().optional(),
  packageId: z.string().optional(),
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

    console.log('Signup attempt received:', { 
      email: req.body?.email, 
      role: req.body?.role,
      hasPassword: !!req.body?.password 
    });

    const data = signUpSchema.parse(req.body);
    console.log('Signup data validated successfully');
    
    // Check if user already exists
    console.log(`Checking if user exists: ${data.email}`);
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email))
      .limit(1);

    if (existingUser.length > 0) {
      console.log(`User already exists: ${data.email}`);
      return res.status(400).json({ error: 'User already exists' });
    }

    console.log(`Creating new user: ${data.email}`);
    // Create user
    const user = await createUser(data);
    console.log(`User created successfully: ${user.id}`);
    
    // Create session
    console.log(`Creating session for user: ${user.id}`);
    const sessionToken = await createUserSession(
      user.id,
      req.headers['user-agent'],
      req.headers['x-forwarded-for'] as string || req.connection?.remoteAddress
    );
    console.log(`Session created successfully for user: ${user.id}`);

    // Set session cookie
    res.setHeader('Set-Cookie', [
      `sessionToken=${sessionToken}; Max-Age=604800; Path=/; HttpOnly; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    ]);

    console.log(`Signup completed successfully for user: ${user.id}`);
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
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      sessionToken
    });
  } catch (error: any) {
    console.error('Signup error details:', {
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