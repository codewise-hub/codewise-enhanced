import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { users, packages, userSessions } from '../../shared/schema';
import type { User } from '../../shared/schema';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

// Create a new user
export async function createUser(userData: {
  email: string;
  password: string;
  name: string;
  role: string;
  ageGroup?: string;
  childName?: string;
  schoolName?: string;
  packageId?: string;
}): Promise<User> {
  try {
    console.log('API: Starting createUser with data:', {
      email: userData.email,
      name: userData.name,
      role: userData.role,
      ageGroup: userData.ageGroup,
      packageId: userData.packageId,
      hasPassword: !!userData.password
    });

    if (!userData.password) {
      throw new Error('Password is required');
    }

    console.log('API: Hashing password...');
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    console.log('API: Password hashed successfully');
    
    const insertData = {
      email: userData.email,
      name: userData.name,
      passwordHash: hashedPassword,
      role: userData.role as any,
      ageGroup: userData.ageGroup as any,
      packageId: userData.packageId,
      subscriptionStatus: 'pending' as const,
      isActive: true,
    };
    
    console.log('API: Inserting user into database with data:', {
      ...insertData,
      passwordHash: '[HIDDEN]'
    });
    
    const [newUser] = await db
      .insert(users)
      .values(insertData)
      .returning();

    if (!newUser) {
      throw new Error('Failed to create user - no data returned from database');
    }

    console.log('API: User created successfully:', {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role
    });

    return newUser;
  } catch (error) {
    console.error('API: Error in createUser:', error);
    throw error;
  }
}

// Authenticate user and create session
export async function signInUser(
  email: string, 
  password: string,
  userAgent?: string,
  ipAddress?: string
): Promise<{ user: User; sessionToken: string } | null> {
  try {
    console.log(`API: Attempting to find user with email: ${email}`);
    
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      console.log(`API: No user found with email: ${email}`);
      return null;
    }
    
    if (!user.isActive) {
      console.log(`API: User account is inactive: ${user.id}`);
      return null;
    }
    
    console.log(`API: User found: ${user.id}, checking password`);

    if (!user.passwordHash) {
      console.log(`API: No password hash for user: ${user.id}`);
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      console.log(`API: Invalid password for user: ${user.id}`);
      return null;
    }
    
    console.log(`API: Password verified for user: ${user.id}`);

    // Update last login
    try {
      await db
        .update(users)
        .set({ lastLoginAt: new Date() })
        .where(eq(users.id, user.id));
      console.log(`API: Updated last login for user: ${user.id}`);
    } catch (updateError) {
      console.error(`API: Failed to update last login for user ${user.id}:`, updateError);
      // Continue even if this fails
    }

    // Create session token
    console.log(`API: Creating session for user: ${user.id}`);
    const sessionToken = await createUserSession(user.id, userAgent, ipAddress);
    console.log(`API: Session created successfully for user: ${user.id}`);

    return { user, sessionToken };
  } catch (error) {
    console.error('API: Error in signInUser function:', error);
    throw error;
  }
}

// Create user session
export async function createUserSession(
  userId: string,
  userAgent?: string,
  ipAddress?: string
): Promise<string> {
  try {
    if (!JWT_SECRET || JWT_SECRET === 'fallback-secret-key') {
      console.warn('API: Using fallback JWT secret - this is not secure for production!');
    }
    
    const sessionToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
    console.log(`API: Generated session token for user: ${userId}`);
    
    await db
      .insert(userSessions)
      .values({
        userId,
        sessionToken,
        userAgent,
        ipAddress,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });
    
    console.log(`API: Session inserted into database for user: ${userId}`);
    return sessionToken;
  } catch (error) {
    console.error('API: Error creating user session:', error);
    throw error;
  }
}

// Get user by session token
export async function getUserBySessionToken(sessionToken: string): Promise<User | null> {
  try {
    const decoded = jwt.verify(sessionToken, JWT_SECRET) as { userId: string };
    
    const [session] = await db
      .select()
      .from(userSessions)
      .where(eq(userSessions.sessionToken, sessionToken))
      .limit(1);

    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.userId))
      .limit(1);

    return user || null;
  } catch (error) {
    return null;
  }
}