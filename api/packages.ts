import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from './_lib/db';
import { packages } from '../shared/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Packages endpoint called');
    
    // Check environment variables
    if (!process.env.DATABASE_URL) {
      console.error('Missing DATABASE_URL environment variable');
      return res.status(500).json({ error: 'Database configuration error' });
    }
    
    console.log('Fetching packages from database...');
    const allPackages = await db
      .select()
      .from(packages)
      .where(eq(packages.isActive, true));
    
    console.log(`Found ${allPackages.length} active packages`);
    res.status(200).json(allPackages);
  } catch (error: any) {
    console.error('Packages fetch error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return res.status(500).json({ 
      error: 'Failed to fetch packages',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}