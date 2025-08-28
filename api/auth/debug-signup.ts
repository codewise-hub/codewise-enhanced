import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '../_lib/db';
import { users } from '../../shared/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Debug signup - Request received');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Test database connection first
    console.log('Testing database connection...');
    
    try {
      // Simple query to test database connectivity
      const testQuery = await db
        .select({ count: users.id })
        .from(users)
        .limit(1);
      console.log('Database connection test successful');
    } catch (dbError: any) {
      console.error('Database connection failed:', dbError);
      return res.status(500).json({
        error: 'Database connection failed',
        details: dbError.message,
        step: 'database_connection_test'
      });
    }

    // Test basic validation
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

    console.log('Testing input validation...');
    let validatedData;
    try {
      validatedData = signUpSchema.parse(req.body);
      console.log('Input validation successful');
    } catch (validationError: any) {
      console.error('Validation failed:', validationError);
      return res.status(400).json({
        error: 'Validation failed',
        details: validationError.errors,
        step: 'input_validation'
      });
    }

    // Test user existence check
    console.log('Checking if user already exists...');
    try {
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, validatedData.email))
        .limit(1);
      
      if (existingUser.length > 0) {
        console.log('User already exists');
        return res.status(400).json({ 
          error: 'User already exists',
          step: 'user_existence_check'
        });
      }
      console.log('User does not exist - can proceed');
    } catch (checkError: any) {
      console.error('User existence check failed:', checkError);
      return res.status(500).json({
        error: 'User existence check failed',
        details: checkError.message,
        step: 'user_existence_check'
      });
    }

    // Test password hashing
    console.log('Testing password hashing...');
    try {
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash(validatedData.password, 12);
      console.log('Password hashing successful');
    } catch (hashError: any) {
      console.error('Password hashing failed:', hashError);
      return res.status(500).json({
        error: 'Password hashing failed',
        details: hashError.message,
        step: 'password_hashing'
      });
    }

    // If we get here, all steps passed
    console.log('All debug checks passed');
    return res.status(200).json({
      status: 'debug_success',
      message: 'All signup prerequisite checks passed',
      steps_completed: [
        'database_connection_test',
        'input_validation', 
        'user_existence_check',
        'password_hashing'
      ]
    });

  } catch (error: any) {
    console.error('Debug signup error:', error);
    return res.status(500).json({
      error: 'Debug signup failed',
      details: error.message,
      stack: error.stack,
      step: 'unexpected_error'
    });
  }
}