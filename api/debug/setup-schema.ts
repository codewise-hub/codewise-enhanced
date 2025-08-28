import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed - use POST' });
  }

  try {
    console.log('=== DATABASE SCHEMA SETUP START ===');
    
    // Import database connection
    const { db } = require('../_lib/db');
    
    // First, let's check what tables exist
    console.log('Checking existing tables...');
    const existingTablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    
    const { executeSQL } = require('../_lib/db');
    const existingTables = await executeSQL(existingTablesQuery);
    console.log('Existing tables:', existingTables);
    
    // Apply the schema step by step
    const schemaCommands = [
      // 1. Packages table
      `CREATE TABLE IF NOT EXISTS packages (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        currency TEXT DEFAULT 'USD',
        duration TEXT NOT NULL,
        features TEXT,
        max_students INTEGER,
        package_type TEXT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // 2. Schools table
      `CREATE TABLE IF NOT EXISTS schools (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        address TEXT,
        phone TEXT,
        email TEXT,
        admin_user_id VARCHAR,
        package_id VARCHAR,
        subscription_status TEXT DEFAULT 'active',
        subscription_start TIMESTAMP,
        subscription_end TIMESTAMP,
        max_students INTEGER DEFAULT 100,
        current_students INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // 3. Users table with all required columns
      `CREATE TABLE IF NOT EXISTS users (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE,
        username TEXT UNIQUE,
        password_hash TEXT,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        age_group TEXT,
        package_id VARCHAR,
        subscription_status TEXT DEFAULT 'pending',
        subscription_start TIMESTAMP,
        subscription_end TIMESTAMP,
        school_id VARCHAR,
        parent_id VARCHAR,
        grade TEXT,
        subjects TEXT,
        last_login_at TIMESTAMP,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // 4. User sessions table (CRITICAL for auth)
      `CREATE TABLE IF NOT EXISTS user_sessions (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR NOT NULL,
        session_token TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        user_agent TEXT,
        ip_address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // 5. Add foreign key constraints
      `ALTER TABLE schools ADD CONSTRAINT IF NOT EXISTS fk_schools_package FOREIGN KEY (package_id) REFERENCES packages(id)`,
      `ALTER TABLE schools ADD CONSTRAINT IF NOT EXISTS fk_schools_admin_user FOREIGN KEY (admin_user_id) REFERENCES users(id)`,
      `ALTER TABLE users ADD CONSTRAINT IF NOT EXISTS fk_users_package FOREIGN KEY (package_id) REFERENCES packages(id)`,
      `ALTER TABLE users ADD CONSTRAINT IF NOT EXISTS fk_users_school FOREIGN KEY (school_id) REFERENCES schools(id)`,
      `ALTER TABLE user_sessions ADD CONSTRAINT IF NOT EXISTS fk_sessions_user FOREIGN KEY (user_id) REFERENCES users(id)`,
      
      // 6. Create indexes
      `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`,
      `CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)`,
      `CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token)`,
      `CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id)`,
    ];
    
    const results = [];
    
    for (let i = 0; i < schemaCommands.length; i++) {
      const command = schemaCommands[i];
      console.log(`Executing command ${i + 1}/${schemaCommands.length}`);
      
      try {
        await executeSQL(command);
        results.push({ step: i + 1, status: 'success', command: command.substring(0, 50) + '...' });
        console.log(`Command ${i + 1} executed successfully`);
      } catch (error: any) {
        console.error(`Command ${i + 1} failed:`, error);
        results.push({ 
          step: i + 1, 
          status: 'error', 
          command: command.substring(0, 50) + '...', 
          error: error.message 
        });
        // Continue with other commands even if one fails
      }
    }
    
    // Insert default packages if they don't exist
    console.log('Inserting default packages...');
    try {
      const insertPackagesQuery = `
        INSERT INTO packages (name, description, price, duration, features, package_type, max_students) VALUES
        ('Free Explorer', 'Perfect for getting started with coding', 0.00, 'monthly', '["5 Coding Lessons", "Basic Projects", "Community Support", "Progress Tracking"]', 'individual', NULL),
        ('Basic Coder', 'For serious young coders', 49.00, 'monthly', '["Unlimited Lessons", "Advanced Projects", "AI Tutor Access", "Certificates", "Parent Reports"]', 'individual', NULL),
        ('Premium Pro', 'Complete learning experience', 99.00, 'monthly', '["Everything in Basic", "1-on-1 Mentoring", "Advanced Robotics", "Portfolio Building", "Priority Support"]', 'individual', NULL)
        ON CONFLICT (name) DO NOTHING
      `;
      
      await executeSQL(insertPackagesQuery);
      results.push({ step: 'packages', status: 'success', command: 'Insert default packages' });
    } catch (error: any) {
      console.error('Failed to insert packages:', error);
      results.push({ step: 'packages', status: 'error', command: 'Insert default packages', error: error.message });
    }
    
    // Final verification
    console.log('Verifying final schema...');
    const finalTablesQuery = `
      SELECT 
        table_name,
        (SELECT count(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
      FROM information_schema.tables t
      WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;
    
    const finalTables = await executeSQL(finalTablesQuery);
    
    console.log('=== DATABASE SCHEMA SETUP COMPLETE ===');
    
    return res.status(200).json({
      status: 'success',
      message: 'Database schema setup completed',
      existingTables: existingTables,
      setupResults: results,
      finalTables: finalTables
    });
    
  } catch (error: any) {
    console.error('=== DATABASE SCHEMA SETUP ERROR ===');
    console.error(error);
    
    return res.status(500).json({
      status: 'error',
      message: 'Database schema setup failed',
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      }
    });
  }
}