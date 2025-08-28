import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';
import { users } from '../../shared/schema';
import { desc } from 'drizzle-orm';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Admin users endpoint called');
    
    // Check environment variables
    if (!process.env.DATABASE_URL) {
      console.error('Missing DATABASE_URL environment variable');
      return res.status(500).json({ error: 'Database configuration error' });
    }
    
    console.log('Fetching users from database...');
    const allUsers = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        ageGroup: users.ageGroup,
        createdAt: users.createdAt
      })
      .from(users)
      .orderBy(desc(users.createdAt));
    
    console.log(`Found ${allUsers.length} users`);
    return res.status(200).json(allUsers);
  } catch (error: any) {
    console.error('Error fetching users:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return res.status(500).json({ 
      error: 'Failed to fetch users',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}