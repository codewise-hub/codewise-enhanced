# CodewiseHub Learning Platform

## Overview

CodewiseHub is a comprehensive coding education platform designed for multiple user types including students (ages 6-17), teachers, and parents. The platform features age-appropriate learning paths with visual block-based programming for younger students (6-11) and text-based coding for teens (12-17). It includes interactive coding labs, progress tracking, project management, and specialized tools like a Micro:bit simulator for hands-on learning experiences.

## Recent Updates (August 2025)

✅ **Course Material System Complete** - Created comprehensive course database with 4 courses, 15 lessons, and 4 robotics activities
✅ **Database Integration** - Set up PostgreSQL with Drizzle ORM for persistent course storage
✅ **Import Tool** - Built automated course material import system with JSON-based content management
✅ **Admin Panel** - Added course management interface with filtering by age groups
✅ **API Endpoints** - Implemented REST API for courses, lessons, and robotics activities
✅ **Vercel Deployment** - Successfully deployed application to production
✅ **Production Import System** - Created multiple import methods including Node.js script and API endpoints
✅ **Windows Compatibility** - Fixed tsx dependency issues with vanilla Node.js import script
✅ **Neon Database Integration** - Created comprehensive setup guide and testing tools for Neon-Vercel integration

**Latest Institutional Enhancement (August 2025):**
✅ **Resolute Education Research** - Analyzed successful institutional STEM education company (300+ schools, 150k+ students)
✅ **Professional Robotics Kits Page** - Created comprehensive kits showcase with CAPS alignment and pricing
✅ **Teacher Training Programs** - Built SACE-endorsed professional development platform with certification tracking
✅ **Advanced AI Research Assistant** - Enhanced AI tutor with technical research capabilities and contextual learning
✅ **Interactive Simulator** - Created sophisticated robotics simulation with hardware integration and collaborative features
✅ **Enhanced Navigation** - Professional navigation system with institutional appeal and mega-menu functionality
✅ **Institutional Home Page** - Professional home page highlighting educational partnerships and school success stories
✅ **Contact Forms Hub** - Comprehensive contact system for schools and parents with detailed inquiry forms
✅ **Enhanced Robotics Data** - Created advanced activities for both age groups with real micro:bit code examples

**Latest Professional Development Platform (August 2025):**
✅ **CAPS Curriculum Alignment** - Comprehensive curriculum mapping showing integration across all grade levels (4-12)
✅ **Institutional Analytics Dashboard** - Advanced analytics with enrollment, engagement, performance, and teacher insights
✅ **Professional Certification Hub** - SACE-endorsed certification programs with 5 specialization tracks
✅ **Enhanced App Integration** - All institutional components integrated with proper routing and enhanced navigation
✅ **Professional Assessment Tools** - Skills mastery tracking, assessment rubrics, and progress analytics
✅ **Teacher Support Systems** - Dedicated analytics for teacher satisfaction, training completion, and support tickets
✅ **Multi-Level Certification Paths** - Foundation to Leadership level certifications with clear progression paths

**Latest Changes (August 2025):**
✅ **TypeScript Error Fixes** - Resolved error handling in API endpoints with proper type checking
✅ **Vercel Function Limit Fix** - Reduced API functions from 23 to 12 by removing duplicate/unused files
✅ **Authentication Flow Enhancement** - Fixed pricing page redirect to proper dashboard after authentication
✅ **Pricing Consistency** - Updated pricing page to match homepage (R349, R549, R749)
✅ **Admin Panel Integration** - Added comprehensive admin dashboard with database management capabilities
✅ **Admin Separation Complete** - Removed admin functionality from main student application
✅ **Dedicated CMS Application** - Created standalone admin-cms.html for content management
✅ **Student Learning Materials** - Added comprehensive StudentLearningMaterials component with courses, lessons, and study materials
✅ **Enhanced Student Dashboard** - Integrated learning materials directly into student experience
✅ **Multi-Role Authentication** - Complete signup flow for all user types including school administrators
✅ **Course Explanation Modals** - Added detailed course information with YouTube video tutorials
✅ **Prompt Engineering Education** - Added AI/prompt engineering course and video tutorial for teen coders
✅ **Age-Appropriate Content** - Fixed duplicate videos and ensured content matches age groups (6-11 vs 12-17)
✅ **Video Content Optimization** - Shortened prompt engineering video to under 2 minutes for better engagement
✅ **Authentication Migration Complete** - Migrated from Firebase to Neon PostgreSQL database with bcrypt password hashing and JWT sessions
✅ **Subscription Package System** - Implemented comprehensive 5-tier subscription system with package selection during student/school admin signup
✅ **Package Selection UI** - Created PackageSelector component with pricing display and feature lists for subscription tiers
✅ **Build Error Resolution** - Fixed import path issues for Vercel deployment compatibility
✅ **Rollup Build Fix** - Resolved Rollup variable tracing error in vite.config.vercel.ts for successful Vercel deployments
✅ **Frontend Debugging** - Added console logging and debugging info to PackageSelector and AuthModal components
✅ **Deployment Ready** - Build process now completes successfully with all assets generated correctly
✅ **Vercel Deployment Fixes** - Resolved frontend routing issues and configuration conflicts
✅ **Prompt Engineering Content Update** - Updated to 2-minute YouTube video (https://www.youtube.com/embed/dOxUroR57xs) explaining what prompt engineering is and its benefits
✅ **Teen Coders Dashboard Enhancement** - Added AI Prompt Engineering course to teen coders learning materials with embedded video support
✅ **Content Loading Strategy** - Implemented YouTube video embedding for reliable content delivery on Vercel platform
✅ **API Route Completion** - Added missing signout.ts and me.ts API endpoints for complete authentication system
✅ **Body Consumption Fix** - Resolved "Body has already been consumed" error in auth.ts and queryClient.ts
✅ **Database Verification** - Confirmed Neon database working correctly with 6 users successfully created
✅ **Vercel API Routes** - Fixed 404 errors on production by completing API endpoint structure
✅ **Authentication System Complete** - Full authentication working on Vercel with Neon database integration
✅ **Database Tables Created** - Production database tables created and authentication endpoints fully operational
✅ **Package Selection Working** - User signup with mandatory package selection (5-tier subscription system) functioning correctly
✅ **Production Deployment Ready** - Complete authentication flow deployed and tested on Vercel platform
✅ **School Administrator Dashboard Complete** - Comprehensive 4-tab management interface with user creation and student-teacher assignment functionality
✅ **Dedicated Pricing Page Created** - Separate /pricing route with South African Rand pricing for student and school packages using router-based navigation
✅ **Enhanced Navigation System** - Router-based navigation preserving home page while adding pricing page access

**Latest Homepage Refinements (August 2025):**
✅ **Individual Student Focus** - Modified homepage messaging from corporate to student-centered while maintaining school appeal
✅ **Curriculum Terminology Update** - Replaced "CAPS aligned" and "SACE endorsement" with "aligned with South African education curriculum"
✅ **Choose Your Learning Path Feature** - Added the original application's learning path selection with Young Coders (6-11) and Teen Coders (12-17)
✅ **Testimonials Removal** - Removed testimonials section from homepage per user preference for cleaner, student-focused design
✅ **Robotics Kit Imagery** - Generated and integrated educational robotics kit display image to showcase hands-on learning
✅ **Balanced Appeal** - Successfully balanced individual student motivation with professional school partnership credibility

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern development patterns
- **Vite** as the build tool for fast development and optimized production builds
- **Tailwind CSS** with shadcn/ui components for consistent, responsive design
- **Component Architecture**: Modular React components with clear separation of concerns
  - Page components for different dashboards (Student, Teacher, Parent)
  - Shared UI components using Radix UI primitives
  - Custom components for specialized features (CodingLab, MicrobitSimulator)

### State Management
- **React Context** for authentication state management
- **TanStack Query** for server state management and caching
- Local state management using React hooks for component-specific state

### Authentication & User Management
- **Neon PostgreSQL Database** with bcrypt password hashing for secure authentication
- **JWT Session Management** with httpOnly cookies for security
- **Express.js API Routes** for signup, signin, signout, and user management
- Multi-role support with different user types (student, teacher, parent, school_admin)
- Age-group specific features and content delivery

### Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **Modular route registration** system for scalable API organization
- **Memory storage** implementation with interface for future database integration
- **Middleware** for request logging, error handling, and JSON parsing

### Database Design
- **Drizzle ORM** with PostgreSQL schema definitions
- **Neon Database** as the PostgreSQL provider
- **Schema structure** includes:
  - Users table with role-based fields
  - Courses and user progress tracking
  - Projects and achievements system
  - Flexible design for multi-tenant usage

### Development & Build System
- **ESM modules** throughout the application for modern JavaScript
- **TypeScript** configuration with path aliases for clean imports
- **Vite development server** with HMR and error overlay
- **Production build** process combining frontend Vite build and backend esbuild compilation

### Specialized Features
- **Blockly integration** for visual programming (younger students)
- **Monaco Editor** for text-based coding (older students)
- **Micro:bit simulator** with LED matrix and button interactions
- **Chart.js** for progress visualization and analytics

## External Dependencies

### Core Framework Dependencies
- **React ecosystem**: React 18, React DOM, TypeScript support
- **Vite**: Build tool with plugins for React and development enhancements
- **Express.js**: Backend server framework with TypeScript support

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component system built on Radix UI

### Database & ORM
- **Drizzle ORM**: TypeScript ORM for database schema and queries
- **Neon Database**: Serverless PostgreSQL database provider
- **Drizzle-kit**: CLI tools for database migrations and schema management

### Authentication & Backend Services
- **Firebase**: Authentication, Firestore database, and file storage
- **TanStack Query**: Server state management and data fetching
- **React Hook Form**: Form handling with validation

### Educational & Development Tools
- **Blockly**: Google's visual programming editor for block-based coding
- **Monaco Editor**: VS Code's editor for text-based programming
- **Chart.js**: Data visualization for progress tracking and analytics

### Development & Build Tools
- **TypeScript**: Static typing for both frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility
- **Replit plugins**: Development environment integration and error handling