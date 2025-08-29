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
  // Immediate response for health check
  if (req.method === 'GET') {
    return res.status(200).json({
      endpoint: '/api/auth/signup',
      method: 'POST',
      status: 'available',
      environment: {
        databaseUrl: !!process.env.DATABASE_URL,
        jwtSecret: !!process.env.JWT_SECRET,
        nodeEnv: process.env.NODE_ENV
      }
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== SIGNUP ATTEMPT START ===');
    
    // Step 1: Check environment variables
    if (!process.env.DATABASE_URL) {
      console.error('Missing DATABASE_URL environment variable');
      return res.status(500).json({ 
        error: 'Missing DATABASE_URL',
        step: 'environment' 
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('Missing JWT_SECRET environment variable');
      return res.status(500).json({ 
        error: 'Missing JWT_SECRET',
        step: 'environment'
      });
    }

    console.log('Environment check passed');

    // Step 2: Validate request body
    if (!req.body) {
      return res.status(400).json({ 
        error: 'Request body is required',
        step: 'validation'
      });
    }

    console.log('Signup request:', { 
      email: req.body?.email, 
      role: req.body?.role,
      hasPassword: !!req.body?.password,
      bodyKeys: Object.keys(req.body || {})
    });

    // Step 3: Validate with Zod
    let data;
    try {
      data = signUpSchema.parse(req.body);
      console.log('Validation successful');
    } catch (validationError: any) {
      console.error('Validation error:', validationError);
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validationError.errors,
        step: 'validation'
      });
    }
    
    // Step 4: Test database connection
    console.log('Testing database connection...');
    try {
      const testResult = await db.select().from(users).limit(1);
      console.log(`Database test successful - found ${testResult.length} users`);
    } catch (dbError: any) {
      console.error('Database connection failed:', dbError);
      return res.status(500).json({ 
        error: 'Database connection failed',
        details: dbError.message,
        step: 'database_connection'
      });
    }

    // Step 5: Check if user already exists
    console.log(`Checking if user exists: ${data.email}`);
    let existingUser;
    try {
      existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email))
        .limit(1);
      console.log(`User existence check completed`);
    } catch (checkError: any) {
      console.error('User existence check failed:', checkError);
      return res.status(500).json({ 
        error: 'User existence check failed',
        details: checkError.message,
        step: 'user_check'
      });
    }

    if (existingUser.length > 0) {
      console.log(`User already exists: ${data.email}`);
      return res.status(400).json({ 
        error: 'User already exists',
        step: 'user_exists' 
      });
    }

    // Step 6: Create user
    console.log(`Creating new user: ${data.email}`);
    let user;
    try {
      user = await createUser(data);
      console.log(`User created successfully: ${user.id}`);
    } catch (userCreateError: any) {
      console.error('User creation failed:', userCreateError);
      return res.status(500).json({ 
        error: 'User creation failed',
        details: userCreateError.message,
        step: 'user_creation'
      });
    }
    
    // Step 7: Create session
    console.log(`Creating session for user: ${user.id}`);
    let sessionToken;
    try {
      sessionToken = await createUserSession(
        user.id,
        req.headers['user-agent'],
        req.headers['x-forwarded-for'] as string || req.connection?.remoteAddress
      );
      console.log(`Session created successfully for user: ${user.id}`);
    } catch (sessionError: any) {
      console.error('Session creation failed:', sessionError);
      return res.status(500).json({ 
        error: 'Session creation failed',
        details: sessionError.message,
        step: 'session_creation'
      });
    }

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
    console.error('=== SIGNUP ERROR ===');
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    
    return res.status(500).json({ 
      error: 'Unexpected signup error',
      message: error.message,
      step: 'unexpected_error',
      details: {
        name: error.name,
        code: error.code,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
}